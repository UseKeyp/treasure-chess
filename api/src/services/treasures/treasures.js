import { db } from 'src/lib/db'
import {
  getTreasuresWithFilter,
  getTreasuresWithFilterCount,
} from 'src/lib/treasures'
import { processPendingMarketTransactions } from 'src/lib/marketSales'

export const treasuresWithFilter = ({ username, owner, sort, filter, page }) =>
  getTreasuresWithFilter({ username, owner, sort, filter, page })
export const treasuresWithFilterCount = ({ username, owner, filter }) =>
  getTreasuresWithFilterCount({ username, filter, owner })

export const treasure = async ({ tokenId }) => {
  let id
  if (tokenId.startsWith('0x')) id = tokenId

  const treasure = await db.treasure.update({
    where: { ...(id ? { id } : { tokenId: Number(tokenId) }) },
    data: { viewCount: { increment: 1 } },
    include: {
      owner: true,
      marketSales: { orderBy: { id: 'desc' }, take: 2 },
    },
  })

  return treasure
}
// Used to get the latest market sale, without slowing down the normal query
export const treasureWithMarketSales = async ({ tokenId }) => {
  let id
  if (tokenId.startsWith('0x')) id = tokenId
  const treasure = await db.treasure.findUnique({
    where: { ...(id ? { id } : { tokenId: Number(tokenId) }) },
    include: {
      marketSales: {
        orderBy: { id: 'desc' },
        take: 2,
        include: { listTx: true, unlistTx: true, saleTransactions: true },
      },
    },
  })
  if (!treasure) return null
  return processPendingMarketTransactions({ treasure })
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
  marketSales: (_obj, { root }) =>
    db.treasure.findUnique({ where: { id: root.id } }).marketSales(),
}
