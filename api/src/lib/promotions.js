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

  if (
    promotion &&
    promotion.members.findIndex(
      (member) => member.memberId === context.currentUser.id
    ) == -1
  ) {
    if (promotion.rewardType === 'MINT_CREDIT') {
      await db.member.update({
        where: { id: context.currentUser.id },
        data: {
          mintCredits: { increment: promotion.mintCredits },
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
