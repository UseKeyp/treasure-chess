import { getLoginUrl, COINBASE } from 'src/lib/oAuth'

export const coinbaseLoginUrl = async () => {
  const res = await getLoginUrl(COINBASE)
  return res
}
