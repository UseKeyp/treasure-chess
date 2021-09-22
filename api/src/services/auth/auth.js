import { getLoginUrl, handleOauthCodeGrant } from 'src/lib/oAuth/oAuth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.skip({ only: ['loginUrl', 'oauthCodeGrant'] })
}

export const loginUrl = (input) => getLoginUrl(input)

export const oauthCodeGrant = (input) => handleOauthCodeGrant(input)
