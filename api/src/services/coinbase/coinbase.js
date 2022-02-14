import { getLoginUrl, COINBASE } from 'src/lib/oAuth'

export const coinbaseLoginUrl = async () => {
  return getLoginUrl(COINBASE)
}
