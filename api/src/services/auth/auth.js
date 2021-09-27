import { getLoginUrl, handleOauthCodeGrant } from 'src/lib/oAuth/oAuth'
import { requireAuth } from 'src/lib/auth'
import { context } from '@redwoodjs/api'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
  rules.skip({ only: ['loginUrl', 'oauthCodeGrant'] })
}

export const loginUrl = (input) => getLoginUrl(input)

export const oauthCodeGrant = (input) => handleOauthCodeGrant(input)

export const refreshToken = async () => {
  const { jwt } = await refreshToken(context.currentUser.refreshToken)
  return { jwt }
}
