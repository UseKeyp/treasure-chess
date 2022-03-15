import { db } from 'src/lib/db'
import Sentry from 'src/lib/sentry'

import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { pinTreasure } from 'src/lib/pinata/pinata'

import { mint } from 'src/lib/web3/treasure/treasure'
import { web3Provider } from 'src/lib/web3/helpers'
import { generateTreasureData } from 'src/lib/treasures'
import { sendDiscordAlert } from 'src/lib/discord/discord'

import { logger } from 'src/lib/logger'
import { isProduction } from 'src/lib/helpers'

const SUBMITTED = 'SUBMITTED'
const COMPLETE = 'COMPLETE'
const FAILED = 'FAILED'

const MINIMUM_CONFIRMATIONS = isProduction ? 15 : 1

export const mintTreasureAndUpdatePurchase = async ({ mintPurchase }) => {
  try {
    const { gameId, gameEndTime, title, member } = mintPurchase

    const game = await fetchGame({
      id: gameId,
      username: member.username,
      endTime: gameEndTime,
      // Create new members if needed, treasureId, etc.
      includeTreasureData: true,
    })

    const treasureData = generateTreasureData({
      game,
      title,
      minter: member,
    })

    const { tokenUri, uriData } = await pinTreasure({
      treasure: {
        ...treasureData,
        black: { ...game.black }, // Inject the players manually
        white: { ...game.white },
      },
      tcn: game.tcn,
    })

    if (mintPurchase.txHash) {
      const { status, tokenId } = await getMintTxStatus({ mintPurchase })
      if (status === SUBMITTED)
        // transaction still pending
        return await db.mintPurchase.update({
          where: { id: mintPurchase.id },
          data: { txStatus: SUBMITTED },
        })

      if (status === COMPLETE) {
        // YAY! Create the treasure in the database
        // TODO: optimize by combining these two db calls
        // Stop, don't mint again
        const purchase = await db.mintPurchase.update({
          where: { id: mintPurchase.id },
          data: {
            txStatus: COMPLETE,
            treasure: {
              create: {
                ...treasureData,
                tokenId,
                uriData,
                tokenUri,
              },
            },
          },
        })
        return purchase
      }
      // If status is FAILED, let's continue and try to mint again
    }

    if (game.tokenId)
      throw `Treasure tokenId:${game.tokenId} already minted and in the database`
    let tx
    try {
      tx = await mint({
        treasure: treasureData,
        tokenUri,
        minterAddress: member.address,
      })
      if (!tx || !tx.hash) throw 'Transaction could not be submitted.'
    } catch (e) {
      await sendDiscordAlert({
        embed: {
          color: 16740982,
          title: `⛈️⛓️  Failed to submit mint transaction!`,
          description: `Mint Purchase ID: ${mintPurchase?.id || '?'}
Order Type: ${mintPurchase?.paymentType || '?'}
Member: ${member?.username || '?'}
Game: ${gameId || '?'}  ${gameEndTime || '?'}

${e.message.substring(0, 2000)}`,
          footer: { text: new Date().toString() },
        },
        channelName: 'orders',
      })
      Sentry.setUser({ username: mintPurchase.member.username })
      Sentry.captureException(e)
      return await db.mintPurchase.update({
        where: { id: mintPurchase.id },
        data: { txStatus: FAILED },
      })
    }

    return await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        txHash: tx.hash,
        txStatus: SUBMITTED,
      },
    })
    /* eslint-disable-next-line no-console */
  } catch (e) {
    throw `mintTreasure() ${e}`
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
  if (receipt?.status === 0) {
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
    if (mintPurchase.txStatus === SUBMITTED) {
      const receipt = await getTxReceipt(mintPurchase.txHash)

      if (receipt?.status === 0) {
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
    return { status: mintPurchase.txStatus }
  } catch (e) {
    throw `getMintTxStatus() ${e}`
  }
}
export const getSaleTxStatus = async (txHash) => {
  try {
    const receipt = await getTxReceipt(txHash)

    if (receipt?.status === 0) {
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
