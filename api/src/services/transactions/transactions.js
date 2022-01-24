import { db } from 'src/lib/db'

export const transactions = () => {
  return db.transaction.findMany()
}

export const transaction = ({ id }) => {
  return db.transaction.findUnique({
    where: { id },
  })
}

export const Transaction = {
  MarketSaleList: (_obj, { root }) =>
    db.transaction.findUnique({ where: { id: root.id } }).MarketSaleList(),
  MarketSaleUnlist: (_obj, { root }) =>
    db.transaction.findUnique({ where: { id: root.id } }).MarketSaleUnlist(),
  MarketSaleSale: (_obj, { root }) =>
    db.transaction.findUnique({ where: { id: root.id } }).MarketSaleSale(),
}
