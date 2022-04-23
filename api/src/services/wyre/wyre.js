import {
  createDepositReservation,
  createWithdrawReservation,
} from 'src/lib/wyre'
import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

export const wyreDepositUrl = async () => {
  const { url, reservation, paymentMethod, destCurrency } =
    await createDepositReservation(context.currentUser.address)
  try {
    await db.depositOrder.create({
      data: {
        paymentType: 'WYRE',
        paymentMethod,
        reservation,
        destCurrency,
        member: { connect: { id: context.currentUser.id } },
      },
    })
  } catch (e) {
    logger.error(e)
    // Do nothing
  }
  return url
}
export const wyreWithdrawUrl = async () => {
  const { url, _reservaton } = await createWithdrawReservation(
    context.currentUser.address
  )
  return url
}
