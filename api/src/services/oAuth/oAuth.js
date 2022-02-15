import {
  oAuthUrl as getOAuthUrl,
  CHESS,
  validateCodeGrant,
} from 'src/lib/oAuth'

export const chessLoginUrl = () => getOAuthUrl(CHESS)

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const oAuthCodeGrant = async ({ type, code, state }) => {
  const { codeVerifier } = await validateCodeGrant({ code, state })
}
