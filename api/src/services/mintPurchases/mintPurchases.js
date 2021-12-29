import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import {
  validateMintRequest,
  processPendingPurchases,
} from 'src/lib/mintPurchases'
import { createMintReservation } from 'src/lib/wyre'

export const mintPurchases = () => {
  return db.mintPurchase.findMany({
    where: { member: { id: context.currentUser.id } },
    orderBy: [{ updatedAt: 'desc' }],
    include: { treasure: true },
  })
}

export const pendingMintPurchases = () => processPendingPurchases()

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
    return mintPurchase
  } else {
    throw new EnvelopError(`Insufficient mint credits`)
  }
}

export const mintCheckoutUrl = async ({ gameId, endTime, title }) => {
  await validateMintRequest({ gameId, endTime, title })
  const { username, address, id: userId } = context.currentUser
  const { url, reservation } = await createMintReservation({
    username,
    gameId,
    endTime,
    address,
    title,
  })
  await db.mintPurchase.create({
    data: {
      member: { connect: { id: userId } },
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
