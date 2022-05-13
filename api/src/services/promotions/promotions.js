import { db } from 'src/lib/db'

export const promotions = () => {
  return db.promotion.findMany()
}

export const promotion = ({ id }) => {
  return db.promotion.findUnique({
    where: { id },
  })
}

export const createPromotion = ({ input }) => {
  return db.promotion.create({
    data: input,
  })
}

export const updatePromotion = ({ id, input }) => {
  return db.promotion.update({
    data: input,
    where: { id },
  })
}

export const deletePromotion = ({ id }) => {
  return db.promotion.delete({
    where: { id },
  })
}

export const Promotion = {
  members: (_obj, { root }) =>
    db.promotion.findUnique({ where: { id: root.id } }).members(),
}
