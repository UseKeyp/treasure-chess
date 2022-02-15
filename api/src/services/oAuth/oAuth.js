import { oAuthUrl as getOAuthUrl, validateCodeGrant } from 'src/lib/oAuth'
import { CHESS } from 'src/lib/oAuth/chess'
import { COINBASE } from 'src/lib/oAuth/coinbase'
import { handleCoinbaseLogin } from 'src/lib/oAuth/coinbase'

export const chessLoginUrl = () => getOAuthUrl(CHESS)

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const oAuthCodeGrant = async ({ type, code, state }) => {
  console.log({ type, code, state })
  // WARNING: Don't return any sensitive user data here
  const tokens = await validateCodeGrant({
    code,
    state,
    type,
  })
  console.log(tokens)
  if (type === COINBASE) {
    console.log({ type })
    await handleCoinbaseLogin(tokens)
    return { action: 'close' }
  }
}
