import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { getTreasureId, createTreasure } from 'src/lib/treasure'
import { InputError } from '@redwoodjs/graphql-server'
import { getNftContract } from 'src/lib/web3/helpers'

export const mintTreasure = async ({ gameId, endTime, title }) => {
  const userId = context.currentUser.id
  // Get user's wallet and sign meta-tx
  const member = await db.member.findUnique({
    where: { id: userId },
  })
  if (!member.address)
    throw new InputError('User does not have a wallet address')
  const idToken = await getIdToken(member.refreshToken)
  const publicAddress = await getTorusPublicAddress(userId)

  // Submit meta-tx to admin wallet

  // Create pending transaction in database

  // Get game details
  const game = await fetchGame({ id: gameId, memberId, endTime })
  // Create treasure and connect pending transaction - minter, owner, tokenId
  const treasure = await createTreasure({ game, memberId, title })
  return treasure
}

export const transferTreasure = async ({ recipient, treasureId }) => {
  const member = await db.member.findUnique({
    where: { id: context.currentUser.id },
  })
  const recipientMember = await fetchMember(recipient)
  if (!member.address)
    throw new InputError('This user does not have a wallet address')
  if (!recipientMember.address)
    throw new InputError('Recipient does not have a wallet address')
  const idToken = await getIdToken(member.refreshToken)
  const { privateKey } = await getTorusKeys(idToken)
  // TODO: Sign and submit message

  // TODO: App admin keys sign and submit

  // TODO: Submit to meta-tx relate

  return true
}
