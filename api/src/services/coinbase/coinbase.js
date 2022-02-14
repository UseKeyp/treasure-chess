import { getLoginUrl } from 'src/lib/oAuth'

const COINBASE = 'coinbase'

export const coinbaseLoginUrl = async () => {
  return getLoginUrl(COINBASE)
}
