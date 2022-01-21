import { db } from 'src/lib/db'

export const marketSales = () => {
  return db.marketSale.findMany()
}

export const marketSale = ({ id }) => {
  return db.marketSale.findUnique({
    where: { id },
  })
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
