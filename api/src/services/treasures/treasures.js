import { db } from 'src/lib/db'
import {
  getTreasuresWithFilter,
  getTreasuresWithFilterCount,
} from 'src/lib/treasures'
import { processPendingMarketTransactions } from 'src/lib/marketSales'

export const treasures = () => db.treasure.findMany()

export const treasuresWithFilter = ({ username, owner, sort, filter, page }) =>
  getTreasuresWithFilter({ username, owner, sort, filter, page })
export const treasuresWithFilterCount = ({ username, owner, filter }) =>
  getTreasuresWithFilterCount({ username, filter, owner })

export const treasure = async ({ tokenId }) => {
  const treasure = await db.treasure.findUnique({
    where: { tokenId },
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        take: 1,
        include: { listTx: true, unlistTx: true, saleTransactions: true },
      },
      owner: true,
    },
  })
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
}
