import { db } from 'src/lib/db'

export const processPromotion = async (type) => {
  let promotion = await db.promotion.findFirst({
    where: {
      type,
      enabled: true,
    },
    include: {
      members: true,
    },
  })

  if (promotion) {
    if (
      promotion.rewardType === 'MINT_CREDIT' &&
      promotion.members.findIndex(
        (member) => member.memberId === context.currentUser.id
      ) == -1
    ) {
      await db.member.update({
        where: { id: context.currentUser.id },
        data: {
          mintCredits: context.currentUser.mintCredits + promotion.mintCredits,
        },
      })

      await db.promotionsOnMembers.create({
        data: {
          promotionId: promotion.id,
          memberId: context.currentUser.id,
        },
      })
    }
  }

  return promotion
}
