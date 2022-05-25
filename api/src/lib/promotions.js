import { db } from 'src/lib/db'

export const processPromotion = async (type) => {
  let promotions = db.promotion.findMany({
    where: {
      members: { id: context.currentUser.id },
      type,
    },
  })

  promotions = await Promise.all(
    promotions.map(async (promotion) => {
      if (promotion.rewardType === 'MINT_CREDIT') {
        const updatedPromotion = await db.promotion.update({
          where: { id: promotion.id },
          data: { mintCredits: (promotion.mintCredits || 0) + 1 },
        })
        return updatedPromotion
      }
      return promotion
    })
  )

  return promotions
}
