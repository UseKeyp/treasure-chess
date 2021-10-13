import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { getTreasure } from 'src/lib/treasure'
import { InputError } from '@redwoodjs/graphql-server'
import { getNftContract } from 'src/lib/web3/helpers'
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

    const tx = await mint({ treasure, tokenUri })
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

    return treasureEntity
  } catch (e) {
    const errorMessage = `mintTreasure() ${e}`
    console.log(errorMessage)
    throw e
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
