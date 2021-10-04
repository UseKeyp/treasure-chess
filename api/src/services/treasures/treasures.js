import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { createTreasure } from 'src/lib/treasure'
import { fetchGame } from 'src/lib/games'

export const treasures = () => {
  return db.treasure.findMany()
}

export const treasure = ({ id }) => {
  return db.treasure.findUnique({
    where: { id },
  })
}

export const treasureNftDetails = async ({ id }) => {
  const treasure = await db.treasure.findUnique({
    where: { id },
  })
  if (treasure) {
    treasure.owner = await fetchMember(treasure.ownerAddress)
    treasure.minter = await fetchMember(treasure.minterAddress)
    // TODO: pull from subgraph
    treasure.bids = [
      { price: '1.00', bidder: 'jschiarizzi' },
      { price: '1.00', bidder: '0xf4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cad' },
    ]
    // TODO: pull from subgraph. Should include bids as well
    treasure.history = [
      { price: '1.00', bidder: 'jschiarizzi' },
      { price: '1.00', bidder: '0xf4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cad' },
    ]
    return treasure
  }
  return null
}

export const mintTreasure = async ({ gameId, endTime, name }) => {
  // Get user's wallet and sign meta-tx
  const { username, id: memberId } = context.currentUser

  // Submit meta-tx to admin wallet

  // Create pending transaction in database

  // Get game details
  const game = await fetchGame({ gameId, username, endTime })
  // Create treasure and connect pending transaction - minter, owner, tokenId
  const treasure = await createTreasure({ game, memberId, name })
  return treasure
}

export const updateTreasure = ({ id, input }) => {
  return db.treasure.update({
    data: input,
    where: { id },
  })
}

export const deleteTreasure = ({ id }) => {
  return db.treasure.delete({
    where: { id },
  })
}

export const Treasure = {
  black: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).black(),
  white: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).white(),
  winner: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).winner(),
  minter: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).minter(),
  owner: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).owner(),
}
