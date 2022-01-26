import { db } from 'src/lib/db'
import {
  createNewTreasureListing,
  removeTreasureListing,
} from 'src/lib/marketSales'

export const marketSales = () => {
  return db.marketSale.findMany()
}

export const marketSale = ({ id }) => {
  return db.marketSale.findUnique({
    where: { id },
  })
}

export const listTreasure = async ({ treasureId, amount }) => {
  const treasure = await db.treasure.findUnique({
    where: { id: treasureId },
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        include: { listTx: true, unlistTx: true, saleTx: true },
      },
      owner: true,
    },
  })
  return createNewTreasureListing({ treasure, amount })
}

export const unlistTreasure = async ({ treasureId }) => {
  const treasure = await db.treasure.findUnique({
    where: { id: treasureId },
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        include: { listTx: true, unlistTx: true, saleTx: true },
      },
      owner: true,
    },
  })
  return removeTreasureListing({ treasure })
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
  saleTx: (_obj, { root }) =>
    db.marketSale.findUnique({ where: { id: root.id } }).saleTx(),
}
