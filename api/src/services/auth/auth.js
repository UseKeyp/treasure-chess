import { getLoginUrl, handleOauthCodeGrant } from 'src/lib/auth/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.skip({ only: ['postMessage', 'oauthCodeGrant'] })
}

export const loginUrl = (input) => getLoginUrl(input)

export const oauthCodeGrant = (input) => handleOauthCodeGrant(input)
