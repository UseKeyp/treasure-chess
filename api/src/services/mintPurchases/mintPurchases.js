import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import {
  validateMintRequest,
  processPendingPurchases,
  processMintBalanceRequest,
} from 'src/lib/mintPurchases'
import { createMintReservation } from 'src/lib/wyre'
import { createCheckoutSession } from 'src/lib/stripe'

export const mintPurchases = () => {
  return db.mintPurchase.findMany({
    where: { member: { id: context.currentUser.id } },
    orderBy: [{ updatedAt: 'desc' }],
    include: { treasure: true },
  })
}

export const pendingMintPurchases = () => processPendingPurchases()

export const cancelMintingPurchase = async ({ id }) => {
  const { memberId } = await db.mintPurchase.findFirst({
    where: { id },
  })

  if (memberId !== context.currentUser.id)
    throw new EnvelopError('Unauthorized')
  return await db.mintPurchase.delete({ where: { id } })
}

export const mintBalance = async ({ gameId, endTime, title, paymentType }) => {
  await validateMintRequest({ gameId, endTime, title })
  logger.debug(`title: ${title}`)
  logger.debug(`context.currentUser.id: ${context.currentUser.id}`)
  return processMintBalanceRequest({ gameId, endTime, title, paymentType })
}

export const mintCheckoutUrl = async ({
  gameId,
  endTime,
  title,
  paymentType,
}) => {
  await validateMintRequest({ gameId, endTime, title, paymentType })
  const { username, address, id: userId } = context.currentUser

  const { email } = db.member.findFirst({
    where: { id: userId },
  })

  let url
  let reservation
  let paymentIntentId
  if (paymentType === 'STRIPE') {
    ;({ url, paymentIntentId } = await createCheckoutSession({
      metadata: { username, gameId, endTime, address, title },
      email,
    }))
  } else if (paymentType === 'WYRE') {
    ;({ url, reservation } = await createMintReservation({
      username,
      gameId,
      endTime,
      address,
      title,
    }))
  } else {
    throw new Error('Payment provider not found')
  }
  await db.mintPurchase.create({
    data: {
      member: { connect: { id: userId } },
      reservation,
      gameId,
      // If Stripe, then we can set the payment intent now
      ...(paymentIntentId && { orderId: paymentIntentId }),
      gameEndTime: endTime,
      title,
      paymentType,
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
