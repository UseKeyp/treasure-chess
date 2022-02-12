import {
  createDepositReservation,
  createWithdrawReservation,
} from 'src/lib/wyre'

export const wyreDepositUrl = async () => {
  const { url, _reservaton } = await createDepositReservation(
    context.currentUser.address
  )
  return url
}
export const wyreWithdrawUrl = async () => {
  const { url, _reservaton } = await createWithdrawReservation(
    context.currentUser.address
  )
  return url
}
