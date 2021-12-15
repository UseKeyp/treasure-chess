import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { generateTreasureData } from 'src/lib/treasures'
import { mint } from 'src/lib/web3/treasure'
import { pinTreasure } from 'src/lib/pinata'

export const mintTreasure = async ({ game, mintPurchase, member, title }) => {
  try {
    if (!member.address) throw 'Minting member does not have a wallet address.'
    if (!title) throw 'Title must not be empty'

    const treasureData = await generateTreasureData({
      game,
      title,
      minter: member,
      owner: member,
      mintPurchase,
    })

    if (mintPurchase.txHash) {
      // TODO: Check the status of the transaction

      // TODO: If failed, attempt to mint again

      // Remove throw once completed
      throw `Treasure has already been minted. Id: ${treasureData.id} txHash: ${mintPurchase.txHash}`
    }
    const { tokenUri, uriData } = await pinTreasure({
      treasure: {
        ...treasureData,
        black: { ...game.black }, // Inject the players manually
        white: { ...game.white },
      },
      tcn: game.tcn,
    })
    // TODO: Check whether a treasure with the same id already exists in the database
    // TODO: Before minting, check on-chain whether there exists a treasure
    // with the same ID hash
    const tx = await mint({
      treasure: treasureData,
      tokenUri,
      minterAddress: member.address,
    })
    if (!tx?.hash) throw 'Transaction was not submitted'

    await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        txHash: tx.hash,
        txStatus: 'SUBMITTED',
      },
    })

    const treasure = await db.treasure.create({
      data: { ...treasureData, uriData, tokenUri },
    })
    // TODO:  remove consoles
    /* eslint-disable-next-line no-console */
    console.log(treasure)

    return treasure
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
