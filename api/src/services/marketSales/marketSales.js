import { db } from 'src/lib/db'
import {
  createNewTreasureListing,
  removeTreasureListing,
  purchaseTreasure,
} from 'src/lib/marketSales'

export const marketSales = () => {
  return db.marketSale.findMany()
}

export const marketSale = ({ id }) => {
  return db.marketSale.findUnique({
    where: { id },
  })
}

export const listTreasure = async ({ tokenId, amount }) => {
  let id
  if (tokenId.startsWith('0x')) id = tokenId
  const treasure = await db.treasure.findUnique({
    where: { ...(id ? { id } : { tokenId: Number(tokenId) }) },
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        include: { listTx: true, unlistTx: true, saleTransactions: true },
      },
      owner: true,
    },
  })
  return createNewTreasureListing({ treasure, amount })
}

export const unlistTreasure = async ({ tokenId }) => {
  let id
  if (tokenId.startsWith('0x')) id = tokenId
  const treasure = await db.treasure.findUnique({
    where: { ...(id ? { id } : { tokenId: Number(tokenId) }) },
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        include: { listTx: true, unlistTx: true, saleTransactions: true },
      },
      owner: true,
    },
  })
  return removeTreasureListing({ treasure })
}

export const buyTreasure = async ({ tokenId }) => {
  let id
  if (tokenId.startsWith('0x')) id = tokenId
  const treasure = await db.treasure.findUnique({
    where: { ...(id ? { id } : { tokenId: Number(tokenId) }) },
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        include: { listTx: true, unlistTx: true, saleTransactions: true },
      },
      owner: true,
    },
  })
  return purchaseTreasure({ treasure })
}

export const MarketSale = {
  treasure: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).treasure(),
  seller: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).seller(),
  buyer: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).buyer(),
  listTx: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).listTx(),
  unlistTx: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).unlistTx(),
  saleTransactions: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).saleTransactions(),
}
