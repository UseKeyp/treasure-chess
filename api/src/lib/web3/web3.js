import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { getTreasure } from 'src/lib/treasure'
import { mint } from 'src/lib/web3/treasure'
import { pinTreasure } from 'src/lib/pinata'

export const mintTreasure = async ({ game, mintPurchase, member, title }) => {
  try {
    if (!member.address) throw 'Minting member does not have a wallet address.'
    if (!title) throw 'Title must not be empty'

    const treasure = await getTreasure({
      game,
      title,
      minter: member,
      owner: member,
      mintPurchase,
    })
    const { tokenUri, uriData } = await pinTreasure({ treasure })
    // TODO: remove consoles
    /* eslint-disable-next-line no-console */
    console.log(uriData)
    /* eslint-disable-next-line no-console */
    console.log(tokenUri)

    // TODO: Before minting, check on-chain whether there exists a treasure
    // with the same ID hash
    const tx = await mint({ treasure, tokenUri, minterAddress: member.address })
    if (!tx?.hash) throw 'Transaction was not submitted'

    await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        txHash: tx.hash,
        txStatus: 'SUBMITTED',
      },
    })

    const treasureEntity = await db.treasure.create({
      data: { ...treasure, uriData },
    })
    // TODO:  remove consoles
    /* eslint-disable-next-line no-console */
    console.log(treasureEntity)

    return treasureEntity
  } catch (e) {
    const errorMessage = `mintTreasure() ${e}`
    /* eslint-disable-next-line no-console */
    console.log(errorMessage)
    throw e
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
    const errorMessage = `mintTreasure() ${e}`
    // TODO: Add Discord bot notifications here
    /* eslint-disable-next-line no-console */
    console.log(errorMessage)
    throw new Error(errorMessage)
  }
}
