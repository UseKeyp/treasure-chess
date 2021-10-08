import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { createTreasure } from 'src/lib/treasure'
import { InputError } from '@redwoodjs/graphql-server'
import { getNftContract } from 'src/lib/web3/helpers'

export const mintTreasure = async ({ game, mintPurchase, member, title }) => {
  try {
    if (!member.address) throw 'Minting member does not have a wallet address.'
    if (!title) throw 'Title must not be empty'
    // Mint here

    // Create treasure and connect pending transaction, minter, owner, tokenId
    const treasure = await createTreasure({
      game,
      title,
      minter: member,
      owner: member,
    })

    await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        txHash,
        txStatus: 'SUBMITTED',
        treasure: { connect: { id: treasure.id } },
      },
    })

    return treasure
  } catch (e) {
    const errorMessage = `mintTreasure() ${e}`
    console.log(errorMessage)
    throw new Error(errorMessage)
  }
}

export const transferTreasure = async ({ recipient, treasureId }) => {
  try {
    const member = await db.member.findUnique({
      where: { id: context.currentUser.id },
    })
    const recipientMember = await fetchMember(recipient)
    if (!member.address) throw 'Sender does not have a wallet address'
    if (!recipientMember.address)
      throw 'Recipient does not have a wallet address'
    const idToken = await getIdToken(member.refreshToken)
    const { privateKey } = await getTorusKeys(idToken)
    // TODO: Sign and submit message

    // TODO: App admin keys sign and submit

    // TODO: Submit to meta-tx relate

    return true
  } catch (e) {
    const errorMessage = `mintTreasure() ${e}`
    console.log(errorMessage)
    throw new Error(errorMessage)
  }
}
