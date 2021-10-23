import { db } from 'src/lib/db'

export const mintPurchases = () => {
  return db.mintPurchase.findMany()
}

export const mintPurchase = ({ id }) => {
  return db.mintPurchase.findUnique({
    where: { id },
  })
}

export const MintPurchase = {
  member: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).member(),
  treasure: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).treasure(),
}
