import { oAuthUrl as getOAuthUrl, validateCodeGrant } from 'src/lib/oAuth'
import { providers, types } from 'src/lib/oAuth/providers'

import { handlePlaidConnection } from 'src/lib/oAuth/providers/plaid'

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const connectPlaid = handlePlaidConnection

export const codeGrant = async ({ type, code, state }) => {
  // WARNING: Don't return any sensitive user data here
  if (!types.includes(type)) throw `Unknown OAuth Provider - ${type}`
  const tokens = await validateCodeGrant({
    code,
    state,
    type,
  })
  const { onSubmitCode } = providers[type]
  return onSubmitCode(tokens)
}
