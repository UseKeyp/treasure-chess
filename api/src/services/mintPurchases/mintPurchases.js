import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { checkAndSetMarketApprovals } from 'src/lib/web3/treasureMarket'
import {
  validateMintRequest,
  processPendingPurchases,
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

export const mintWithCredit = async ({ gameId, endTime, title }) => {
  await validateMintRequest({ gameId, endTime, title })
  logger.debug(`title: ${title}`)
  logger.debug(`context.currentUser.id: ${context.currentUser.id}`)
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
    try {
      await checkGasAndAirdrop({ member: context.currentUser })
      await checkAndSetMarketApprovals({ member: context.currentUser })
    } catch {
      // Do nothing
    }
    await db.member.update({
      where: { id: context.currentUser.id },
      data: { mintCredits: context.currentUser.mintCredits - 1 },
    })
    return mintPurchase
  } else {
    throw new EnvelopError(`Insufficient mint credits`)
  }
}

export const mintCheckoutUrl = async ({
  gameId,
  endTime,
  title,
  paymentType,
}) => {
  await validateMintRequest({ gameId, endTime, title, paymentType })
  const { username, address, id: userId } = context.currentUser
  let url
  let reservation
  let paymentIntentId
  if (paymentType === 'STRIPE') {
    ;({ url, paymentIntentId } = await createCheckoutSession({
      metadata: { username, gameId, endTime, address, title },
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
