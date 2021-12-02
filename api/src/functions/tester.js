import { getUsdcBalance } from 'src/lib/web3/usdcBalGetter'

export const handler = async () => {
  return {
    statusCode: 200,
    body: await getUsdcBalance()
  }
}
