import { getUsdcBalance as getUsdcBal } from 'src/lib/web3/tokens.js'

export const getUsdcBalance = async () =>
  getUsdcBal(context.currentUser.address)
