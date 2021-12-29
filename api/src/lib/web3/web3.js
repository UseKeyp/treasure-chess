import { db } from 'src/lib/db'
import Sentry from 'src/lib/sentry'

import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { pinTreasure } from 'src/lib/pinata/pinata'

import { mint } from 'src/lib/web3/treasure/treasure'
import { web3Provider } from 'src/lib/web3/helpers'
import { generateTreasureData } from 'src/lib/treasures'
import { isProduction } from 'src/lib/helpers'

import { sendDiscordAlert } from 'src/lib/discord/discord'

const SUBMITTED = 'SUBMITTED'
const COMPLETE = 'COMPLETE'
const FAILED = 'FAILED'

const DISCORD_MESSAGE_TITLE = isProduction ? '[prod]' : '[dev]'

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
      mintPurchase,
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
        await db.treasure.upsert({
          where: { tokenId },
          create: {
            ...treasureData,
            tokenId,
            uriData,
            tokenUri,
          },
          update: {},
        })
        return await db.mintPurchase.update({
          where: { id: mintPurchase.id },
          data: { txStatus: COMPLETE },
          include: { treasure: true },
        })
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
          title: `${DISCORD_MESSAGE_TITLE}  ⛈️⛓️  Failed to submit mint transaction!`,
          description: `Mint Purchase ID: ${mintPurchase?.id || '?'}
Order Type: ${mintPurchase?.paymentType || '?'}
Member: ${member?.username || '?'}
Game: ${gameId || '?'}  ${gameEndTime || '?'}

${e.message.substring(0, 2000)}`,
          footer: { text: new Date().toString() },
        },
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

export const getMintTxStatus = async ({ mintPurchase }) => {
  try {
    if (mintPurchase.txStatus === SUBMITTED) {
      const receipt = await web3Provider.getTransactionReceipt(
        mintPurchase.txHash
      )

      if (receipt?.status === 0) {
        return { status: FAILED }
      } else if (receipt?.status == 1 && receipt?.confirmations >= 1) {
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
    /* eslint-disable-next-line no-console */
    console.log(errorMessage)
    throw new Error(errorMessage)
  }
}
