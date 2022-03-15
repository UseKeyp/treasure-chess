import { oAuthUrl as getOAuthUrl, validateCodeGrant } from 'src/lib/oAuth'
import { CHESS } from 'src/lib/oAuth/chess'
import { handleCoinbaseLogin, COINBASE } from 'src/lib/oAuth/coinbase'
import { handlePlaidConnection } from 'src/lib/oAuth/wyre'

export const chessLoginUrl = () => getOAuthUrl(CHESS)

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const connectPlaid = ({ code, accountId }) =>
  handlePlaidConnection({ code, accountId })

export const codeGrant = async ({ type, code, state }) => {
  // WARNING: Don't return any sensitive user data here
  const tokens = await validateCodeGrant({
    code,
    state,
    type,
  })
  if (type === COINBASE) {
    await handleCoinbaseLogin(tokens)
    return {
      action: 'close',
      text: 'Successfully connected to Coinbase',
      status: 'SUCCESS',
    }
  }
}
