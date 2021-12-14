import { db } from 'src/lib/db'

export const mintPurchases = () => {
  return db.mintPurchase.findMany({
    where: { member: { id: context.currentUser.id } },
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
    include: { treasure: true },
  })
}

export const MintPurchase = {
  member: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).member(),
  treasure: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).treasure(),
}
