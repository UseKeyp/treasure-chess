import { db } from 'src/lib/db'
import Sentry from 'src/lib/sentry'

import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { pinTreasure } from 'src/lib/pinata/pinata'
import { formatUnits, formatEther } from '@ethersproject/units'

import { mint } from 'src/lib/web3/treasure'
import { web3Provider } from 'src/lib/web3/helpers'
import { generateTreasureData } from 'src/lib/treasures'
import { sendDiscordAdminAlert } from 'src/lib/discord/admin'

import { logger } from 'src/lib/logger'
import { updateMauticContactMinted } from 'src/lib/mautic'
import { isProduction, isOlderThanResubmitTimeout } from 'src/lib/helpers'
import { getAdminBalance } from './wallets/admin'

import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'
const EXPLORER_BASE_URL = getExplorerBaseUrlFromName(
  process.env.ETHEREUM_NETWORK_NAME
)

const SUBMITTED = 'SUBMITTED'
const COMPLETE = 'COMPLETE'
const FAILED = 'FAILED'

const MINIMUM_CONFIRMATIONS = isProduction ? 15 : 1
const MAX_RESUBMIT_ATTEMPTS = 0

const alertDiscord = async (treasure) => {
  try {
    const adminMaticBalance = await getAdminBalance()
    await sendDiscordAdminAlert({
      embed: {
        color: 8963403,
        title: `✨ Mint success!`,
        url: `${process.env.APP_DOMAIN}/treasures/${treasure.tokenId}`,
        description: `${EXPLORER_BASE_URL}token/${treasure.id}`,
        fields: [
          { name: 'tokenId', value: treasure.tokenId, inline: true },
          {
            name: 'Admin wallet',
            value: `${formatEther(adminMaticBalance).substring(0, 6)} ETH`,
            inline: true,
          },
        ],
        image: { url: treasure.openGraphImageSrc },
        footer: { text: new Date().toString() },
      },
      channelName: 'mint',
    })
  } catch (e) {
    logger.error(e)
  }
}
const mintFailGracefully = async ({ mintPurchase, errorMessage }) => {
  await sendDiscordAdminAlert({
    embed: {
      color: 16740982,
      title: `⛈️⛓️  Failed to submit mint transaction!`,
      description: `Mint Purchase ID: ${mintPurchase.id || '?'}
Order Type: ${mintPurchase?.paymentType || '?'}
Member: ${mintPurchase.member.username || '?'}
Game: ${mintPurchase.gameId || '?'}  ${mintPurchase.gameEndTime || '?'}

${errorMessage.substring(0, 2000)}`,
      footer: { text: new Date().toString() },
    },
    channelName: 'orders',
  })

  Sentry.setUser({ username: mintPurchase.member?.username })
  Sentry.captureException(errorMessage)

  // Apply mint credits to the account
  await db.member.update({
    where: { id: mintPurchase.member.id },
    data: { mintCredits: { increment: 1 } },
  })

  return await db.mintPurchase.update({
    where: { id: mintPurchase.id },
    data: { status: FAILED },
  })
}

export const mintTreasureAndUpdatePurchase = async ({ mintPurchase }) => {
  logger.debug('invoked mintTreasureAndUpdatePurchase')
  try {
    const { gameId, gameEndTime, title, member } = mintPurchase

    const game = await fetchGame({
      id: gameId,
      username: member.username,
      endTime: gameEndTime,
      // Create new members if needed, treasureId, etc.
      includeTreasureData: true,
    })
    if (!game) throw `No game found ${gameId} ${gameEndTime}`
    // logger.debug({ custom: game }, 'Game')
    if (game.tokenId) {
      const GAME_ALREADY_MINTED = `Purchase found, but the Treasure was already minted. `
      logger.info(GAME_ALREADY_MINTED)
      return mintPurchase
    }

    const treasureData = generateTreasureData({
      game,
      title,
      minter: member,
    })

    const { tokenUri, uriData, openGraphImageSrc } = await pinTreasure({
      treasure: {
        ...treasureData,
        black: { ...game.black }, // Inject the players manually
        white: { ...game.white },
      },
      tcn: game.tcn,
      gameId,
    })
    // logger.debug({ custom: mintPurchase }, 'mintPurchase')
    if (mintPurchase.transaction?.id) {
      const { status, tokenId } = await getMintTxStatus({ mintPurchase })
      if (status === COMPLETE) {
        // YAY! Create the treasure in the database
        // TODO: optimize by combining these two db calls
        // Stop, don't mint again
        logger.debug('Mint transaction complete!')
        const purchase = await db.mintPurchase.update({
          where: { id: mintPurchase.id },
          data: {
            status: COMPLETE,
            transaction: { update: { status: COMPLETE } },
            treasure: {
              create: {
                ...treasureData,
                tokenId,
                uriData,
                tokenUri,
                openGraphImageSrc,
              },
            },
          },
        })
        await alertDiscord({
          ...treasureData,
          tokenId,
          uriData,
          tokenUri,
          openGraphImageSrc,
        })
        await updateMauticContactMinted({ member })
        return purchase
      }
      if (status === SUBMITTED) {
        logger.debug(`Status is SUBMITTED for ${mintPurchase.transaction.id}`)
        if (!isOlderThanResubmitTimeout(mintPurchase.transaction.updatedAt))
          return mintPurchase
        logger.debug(`Tx is >2 hours old, so we will resubmit`)
      }
      if (status === FAILED) {
        await db.transaction.update({
          where: { id: mintPurchase.transaction?.id },
          data: { status: FAILED },
        })
        return mintFailGracefully({
          mintPurchase,
          errorMessage: 'Transaction failed',
        })
      }
      // Taking >10 minutes to confirm, or haven't submitted yet
    }

    if (game.tokenId)
      throw `Treasure tokenId:${game.tokenId} already minted and in the database`

    // Move existing transaction to staleTransactions
    if (mintPurchase.transaction) {
      logger.debug(`Moving to staleTransactions ${mintPurchase.transaction.id}`)
      mintPurchase = await db.mintPurchase.update({
        where: { id: mintPurchase.id },
        data: {
          staleTransactions: { connect: [{ id: mintPurchase.transaction.id }] },
          transaction: { disconnect: true },
        },
      })
    }
    // Validate if we should try to resubmit
    if (mintPurchase?.staleTransactions.length > MAX_RESUBMIT_ATTEMPTS) {
      const MAX_RESUBMIT_ATTEMPTS_MESSAGE = `${MAX_RESUBMIT_ATTEMPTS} attempts reached... minting FAILED`
      logger.info(MAX_RESUBMIT_ATTEMPTS_MESSAGE)
      return mintFailGracefully({
        mintPurchase,
        errorMessage: MAX_RESUBMIT_ATTEMPTS_MESSAGE,
      })
    }

    let tx
    try {
      tx = await mint({
        treasure: treasureData,
        tokenUri,
        minterAddress: member.address,
        // 5% boost per failed attempt
        gasMultiplier: 1 + mintPurchase.staleTransactions.length * 0.05,
      })
      // TODO: dont fail the mint purchase here
      if (!tx || !tx.hash) throw 'Transaction could not be submitted.'
    } catch (error) {
      return mintPurchase
      // TODO: If submitting a tx fails, what should happen? Should it be failure-type specific?
      // return mintFailGracefully({ mintPurchase, errorMessage: error.message })
    }
    logger.debug(formatUnits(tx.gasLimit, 'gwei'))
    return await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        transaction: {
          create: {
            id: tx.hash,
            status: SUBMITTED,
            gasLimit: Number(formatUnits(tx.gasLimit, 'wei')),
            maxPriorityFeePerGas: Number(
              formatUnits(tx.maxPriorityFeePerGas, 'gwei')
            ),
            maxFeePerGas: Number(formatUnits(tx.maxFeePerGas, 'gwei')),
          },
        },
      },
    })
    /* eslint-disable-next-line no-console */
  } catch (e) {
    throw `mintTreasureAndUpdatePurchase() ${JSON.stringify(
      {
        ...mintPurchase,
        member: {
          ...mintPurchase.member,
          refreshToken: 'REDACTED',
          accessToken: 'REDACTED',
        },
      },
      undefined,
      4
    )} ${e}`
  }
}

const getLogByTopic = ({ logs, topic }) => {
  let logByTopic = null
  logs.map((log) => {
    if (log.topics.indexOf(topic) >= 0) logByTopic = log
  })
  return logByTopic
}

export const getTxReceipt = async (txHash) =>
  web3Provider.getTransactionReceipt(txHash)

export const getTxStatus = async (txHash) => {
  const receipt = await getTxReceipt(txHash)
  if (
    receipt?.status === 0 &&
    receipt?.confirmations >= MINIMUM_CONFIRMATIONS
  ) {
    return FAILED
  } else if (
    receipt?.status == 1 &&
    receipt?.confirmations >= MINIMUM_CONFIRMATIONS
  ) {
    return COMPLETE
  }
  return SUBMITTED
}

export const getMintTxStatus = async ({ mintPurchase }) => {
  try {
    if (mintPurchase.transaction?.status === SUBMITTED) {
      const receipt = await getTxReceipt(mintPurchase.transaction.id)
      logger.debug(
        { custom: { receipt, id: mintPurchase.transaction.id } },
        'getMintTxStatus'
      )
      if (
        receipt?.status === 0 &&
        receipt?.confirmations >= MINIMUM_CONFIRMATIONS
      ) {
        return { status: FAILED }
      } else if (
        receipt?.status == 1 &&
        receipt?.confirmations >= MINIMUM_CONFIRMATIONS
      ) {
        const log = getLogByTopic({
          logs: receipt.logs,
          topic:
            '0x106687a5763ca3a7dc8103c314927515b5a78bb3523d14a54b213bb47b39c6bf',
        })
        return {
          status: COMPLETE,
          tokenId: Number(`0x${log.data.substring(66, 130)}`),
        }
      }
    }
    return { status: mintPurchase.transaction?.status }
  } catch (e) {
    throw `getMintTxStatus() ${e}`
  }
}
export const getSaleTxStatus = async (txHash) => {
  try {
    const receipt = await getTxReceipt(txHash)

    if (
      receipt?.status === 0 &&
      receipt?.confirmations >= MINIMUM_CONFIRMATIONS
    ) {
      return { status: FAILED }
    } else if (
      receipt?.status == 1 &&
      receipt?.confirmations >= MINIMUM_CONFIRMATIONS
    ) {
      const log = getLogByTopic({
        logs: receipt.logs,
        topic:
          '0x8652ee85f1e21c57e45f7228891f53ae2e89cbfa645c174c3e6630be914a2bb5',
      })
      return {
        status: COMPLETE,
        tokenId: Number(`0x${log.data.substring(66, 130)}`),
        buyerAddress: `0x${log.data.substring(154, 194)}`,
      }
    }
    return {
      status: SUBMITTED,
    }
  } catch (e) {
    throw `getSaleTxStatus() ${e}`
  }
}

export const transferTreasure = async ({ recipient, _treasureId }) => {
  try {
    const member = await db.member.findUnique({
      where: { id: context.currentUser.id },
    })
    const recipientMember = await fetchMember(recipient)
    if (!member.address) throw 'Sender does not have a wallet address'
    if (!recipientMember.address)
      throw 'Recipient does not have a wallet address'

    // TODO: Sign and submit message

    // TODO: App admin keys sign and submit

    // TODO: Submit to meta-tx relate

    return true
  } catch (e) {
    const errorMessage = `transferTreasure() ${e}`
    // TODO: Add Discord bot notifications here
    logger.error(errorMessage)
    throw new Error(errorMessage)
  }
}
