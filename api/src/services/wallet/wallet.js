import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { fetchMember } from 'src/lib/members'
import { getTreasureId, createTreasure } from 'src/lib/treasure'

export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  // TODO: Validate the JWT is the most up-to-date
}

// TODO: Add an afterResolver to update the JWT and send it to the FE
// How to update the FE JWT???? Does every call need to return the new JWT

// TODO: rename to "mint" and remove from the treasure service
export const mintTreasure = async ({ gameId, endTime, name }) => {
  // Get user's wallet and sign meta-tx
  // TODO: Remove hardcoded member ID and pull from auth context
  const memberId = 'jschiarizzi'
  // Submit meta-tx to admin wallet

  // Create pending transaction in database

  // Get game details
  const game = await fetchGame({ id: gameId, memberId, endTime })
  // Create treasure and connect pending transaction - minter, owner, tokenId
  const treasure = await createTreasure({ game, memberId, name })
  return treasure
}

export const Wallet = {}
