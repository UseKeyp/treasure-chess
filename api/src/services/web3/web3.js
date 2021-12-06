import tokens from 'src/lib/web3/tokens.js'

export const getUsdcBalance = async () => {
  return await tokens.usdcBalanceGetter()
}
