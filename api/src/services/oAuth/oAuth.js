import { oAuthUrl as getOAuthUrl, processCodeGrant } from 'src/lib/oAuth'
import { providers, types } from 'src/lib/oAuth/providers'

import { handlePlaidConnection } from 'src/lib/oAuth/providers/plaid'

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const connectPlaid = handlePlaidConnection

export const codeGrant = async ({ type, code, state }) => {
  // WARNING: Don't return any sensitive user data here
  logger.debug(`code grant - ${type}`)
  return {
    action: '',
    text: '',
    status: '',
  }
  // if (!types.includes(type)) throw `Unknown OAuth Provider - ${type}`
  // const tokens = await processCodeGrant({
  //   code,
  //   state,
  //   type,
  // })
  // const { onConnected } = providers[type]
  // return onConnected(tokens)
}
