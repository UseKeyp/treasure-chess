import tokens from 'src/lib/web3/tokens.js'
export const getUsdcBalance = async () => {
  //return context.currentUser.address

  return await tokens.usdcBalanceGetter()
}
