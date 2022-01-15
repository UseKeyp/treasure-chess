import { db } from 'src/lib/db'
import {
  getTreasuresWithFilter,
  getTreasuresWithFilterCount,
} from 'src/lib/treasures'

export const treasures = () => db.treasure.findMany()

export const treasuresWithFilter = ({ username, owner, sort, filter, page }) =>
  getTreasuresWithFilter({ username, owner, sort, filter, page })
export const treasuresWithFilterCount = ({ username, owner, filter }) =>
  getTreasuresWithFilterCount({ username, filter, owner })

export const treasure = ({ tokenId }) =>
  db.treasure.findUnique({
    where: { tokenId },
  })

export const treasureNftDetails = async ({ tokenId }) => {
  const treasure = await db.treasure.findUnique({
    where: { tokenId },
    include: {
      owner: true,
      minter: true,
    },
  })
  if (treasure) {
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
