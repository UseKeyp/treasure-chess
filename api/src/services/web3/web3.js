// TODO:  REMOVE lint disable
/* eslint-disable */

import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { getTreasureId, createTreasure } from 'src/lib/treasure'
import { InputError } from '@redwoodjs/graphql-server'

// TODO: Add an afterResolver to update the JWT and send it to the FE
// How to update the FE JWT???? Does every call need to return the new JWT

// TODO: rename to "mint" and remove from the treasure service
export const mintTreasure = async ({ gameId, endTime, name }) => {
  // Get user's wallet and sign meta-tx
  const member = await db.member.findUnique({
    where: { id: context.currentUser.id },
  })
  if (!member.address)
    throw new InputError('User does not have a wallet address')
  const idToken = await getIdToken(member.refreshToken)
  const { publicAddress, privateKey } = await getTorusKeys(idToken)

  // Submit meta-tx to admin wallet

  // Create pending transaction in database

  // Get game details
  const game = await fetchGame({ id: gameId, memberId, endTime })
  // Create treasure and connect pending transaction - minter, owner, tokenId
  const treasure = await createTreasure({ game, memberId, name })
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

export const Wallet = {}
