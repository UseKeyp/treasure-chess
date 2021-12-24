import { db } from 'src/lib/db'
import {
  fetchPendingMintPurchases,
  fetchMintPurchase,
  validateMintRequest,
} from 'src/lib/mintPurchases'

export const mintPurchases = () => {
  return db.mintPurchase.findMany({
    where: { member: { id: context.currentUser.id } },
    orderBy: [{ updatedAt: 'desc' }],
    include: { treasure: true },
  })
}

export const pendingMintPurchases = async () => {
  const pendingPurchases = await fetchPendingMintPurchases()
  await Promise.all(
    pendingPurchases.map((mintPurchase) => {
      if (mintPurchase.txStatus === 'SUBMITTED')
        return async () => {
          // Check transaction status and mint
        }
    })
  )
  return pendingPurchases
}

export const mintWithCredit = async ({ gameId, endTime, title }) => {
  await validateMintRequest({ gameId, endTime, title })
  if (context.currentUser.mintCredits > 0) {
    const mintPurchase = await db.mintPurchase.create({
      data: {
        member: { connect: { id: context.currentUser.id } },
        gameId,
        paymentType: 'MINTCREDIT',
        orderStatus: 'COMPLETE',
        gameEndTime: endTime,
        title,
      },
    })
    await db.member.update({
      where: { id: context.currentUser.id },
      data: { mintCredits: context.currentUser.mintCredits - 1 },
    })
    // TODO: Process order
    return mintPurchase.id
  } else {
    throw new EnvelopError(`Insufficient mint credits`)
  }
}

export const mintCheckoutUrl = async ({ gameId, endTime, title }) => {
  await validateMintRequest({ gameId, endTime, title })
  const { url, reservation } = await createMintReservation({
    username,
    gameId,
    endTime,
    address,
    title,
  })
  await db.mintPurchase.create({
    data: {
      member: { connect: { id: context.currentUser.id } },
      reservation,
      gameId,
      gameEndTime: endTime,
      title,
      orderStatus: 'RESERVATION',
    },
  })
  return url
}

export const MintPurchase = {
  member: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).member(),
  treasure: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).treasure(),
}
