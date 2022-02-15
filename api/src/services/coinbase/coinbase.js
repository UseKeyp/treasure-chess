import { oAuthUrl, COINBASE } from 'src/lib/oAuth'

export const coinbaseLoginUrl = async () => {
  const res = await oAuthUrl(COINBASE)
  return res
}
