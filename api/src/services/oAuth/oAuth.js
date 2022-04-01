import { oAuthUrl as getOAuthUrl, processCodeGrant } from 'src/lib/oAuth'

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const codeGrant = ({ state, code, type, accountId }) =>
  processCodeGrant({ state, code, type, accountId })
