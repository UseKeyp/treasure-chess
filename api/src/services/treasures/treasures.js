import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { createMintReservation } from 'src/lib/wyre/wyre'
import { validateTreasureTitle } from 'src/lib/helpers'
import { EnvelopError } from '@envelop/core'

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

export const mintCheckoutUrl = async ({ gameId, endTime, title }) => {
  validateTreasureTitle(title)
  const { username, address } = context.currentUser
  const game = await fetchGame({
    id: gameId,
    username,
    endTime,
  })
  if (!game)
    throw new EnvelopError(
      `Member ${username} did not participate in this game`
    )
  const { url, reservation } = await createMintReservation({
    username,
    gameId,
    endTime,
    address,
    title,
  })
  await db.mintPurchase.create({
    data: {
      member: { connect: { id: context.currentUser.id } },
      reservation,
      gameId,
      gameEndTime: endTime,
      title,
    },
  })
  return url
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
