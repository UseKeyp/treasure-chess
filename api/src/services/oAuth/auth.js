import { oAuthUrl, CHESS, validateCodeGrant } from 'src/lib/oAuth'

// Could be optimized to be more general-purpose
export const oAuthUrl = ({ type }) => oAuthUrl(type)

export const oAuthCodeGrant = async ({ type, code, state }) => {
  const { codeVerifier } = await validateCodeGrant({ code, state })
}
