import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { generateTreasureData } from 'src/lib/treasures'
import { mint } from 'src/lib/web3/treasure/treasure'
import { pinTreasure } from 'src/lib/pinata/pinata'

export const mintTreasure = async ({ mintPurchase }) => {
  try {
    const { gameId, gameEndTime, title, member } = mintPurchase

    const game = await fetchGame({
      id: gameId,
      username: member.username,
      endTime: gameEndTime,
      // Create new members if needed, treasureId, etc.
      includeTreasureData: true,
    })

    console.log(game)
    const treasureData = generateTreasureData({
      game,
      title,
      minter: member,
      mintPurchase,
    })
    console.log(treasureData)

    if (mintPurchase.txHash) {
      // TODO: Check the status of the transaction
      // TODO: If failed, attempt to mint again
      // Remove throw once completed
      throw `Treasure has already been minted. Id: ${treasureData.id} txHash: ${mintPurchase.txHash}`
    }
    // const { tokenUri, uriData } = await pinTreasure({
    //   treasure: {
    //     ...treasureData,
    //     black: { ...game.black }, // Inject the players manually
    //     white: { ...game.white },
    //   },
    //   tcn: game.tcn,
    // })
    // TODO: Check whether a treasure with the same id already exists in the database
    // TODO: Before minting, check on-chain whether there exists a treasure
    // with the same ID hash
    // const tx = await mint({
    //   treasure: treasureData,
    //   tokenUri,
    //   minterAddress: member.address,
    // })
    // if (!tx?.hash) throw 'Transaction was not submitted'
    //
    // await db.mintPurchase.update({
    //   where: { id: mintPurchase.id },
    //   data: {
    //     txHash: tx.hash,
    //     txStatus: 'SUBMITTED',
    //   },
    // })
    //
    // const treasure = await db.treasure.create({
    //   data: { ...treasureData, uriData, tokenUri },
    // })
    // // TODO:  remove consoles
    // /* eslint-disable-next-line no-console */
    // console.log(treasure)
    //
    // return treasure
  } catch (e) {
    throw `mintTreasure() ${e}`
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
