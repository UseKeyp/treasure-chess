import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { createMintReservation } from 'src/lib/wyre/wyre'
import { validateTreasureTitle } from 'src/lib/helpers'
import { getTreasuresWithArguments } from 'src/lib/treasures'
import { EnvelopError } from '@envelop/core'

export const treasures = ({ username, sort, filter }) =>
  getTreasuresWithArguments({ username, sort, filter })

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
  const existingPurchase = await db.mintPurchase.findMany({
    where: {
      gameId,
      gameEndTime: endTime,
      memberId: context.currentUser.id,
    },
  })
  if (existingPurchase.length)
    throw new EnvelopError(`This Treasure cannot be minted right now.`)
  const game = await fetchGame({
    id: gameId,
    username,
    endTime,
  })
  if (!game)
    throw new EnvelopError(
      `Member ${username} did not participate in this game.`
    )
  const { mintCredits } = await db.member.findUnique({
    where: { id: context.currentUser.id },
  })
  if (mintCredits > 0) {
    const mintPurchase = await db.mintPurchase.create({
      data: {
        member: { connect: { id: context.currentUser.id } },
        gameId,
        paymentType: 'MINTCREDIT',
        orderStatus: 'COMPLETE',
        gameEndTime: endTime,
        title,
      },
    })
    const remainingCredits = mintCredits - 1
    await db.member.update({
      where: { id: context.currentUser.id },
      data: { mintCredits: remainingCredits },
    })
    return mintPurchase.id
  } else {
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
        orderStatus: 'RESERVATION',
      },
    })
    return url
  }
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
