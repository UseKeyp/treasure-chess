import { db } from 'src/lib/db'

import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { pinTreasure } from 'src/lib/pinata/pinata'

import { mint } from 'src/lib/web3/treasure/treasure'
import { web3Provider } from 'src/lib/web3/helpers'
import { generateTreasureData } from 'src/lib/treasures'

const SUBMITTED = 'SUBMITTED'
const COMPLETE = 'COMPLETE'
const FAILED = 'FAILED'

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
        // Stop, don't mint again
        return await db.mintPurchase.update({
          where: { id: mintPurchase.id },
          data: { txStatus: COMPLETE },
        })
      }
      // If status is FAILED, let's continue and try to mint again
    }

    if (game.tokenId)
      throw `Treasure tokenId:${game.tokenId} already minted and in the database`

    const tx = await mint({
      treasure: treasureData,
      tokenUri,
      minterAddress: member.address,
    })
    if (!tx || !tx.hash) throw 'Transaction was not submitted'

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

export const getMintTxStatus = async ({ mintPurchase }) => {
  try {
    if (mintPurchase.txStatus === SUBMITTED) {
      const receipt = await web3Provider.getTransactionReceipt(
        mintPurchase.txHash
      )
      if (receipt?.status === 0) {
        return { status: FAILED }
      } else if (receipt?.status == 1 && receipt?.confirmations >= 1) {
        // TODO: get tokenId from receipt logs
        const highestTokenId = await db.treasure.count()
        return { status: COMPLETE, tokenId: highestTokenId + 1 }
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
