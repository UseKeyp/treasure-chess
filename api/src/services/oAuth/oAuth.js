import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { oAuthUrl as getOAuthUrl, processCodeGrant } from 'src/lib/oAuth'
import { types, providers } from 'src/lib/oAuth/providers'

export const oAuthUrl = ({ type }) => getOAuthUrl(type)

export const codeGrant = async (args) => {
  try {
    const { type } = args
    // WARNING: Don't return any sensitive user data here
    logger.debug(`code grant - ${type}`)
    if (!types.includes(type)) throw `Unknown OAuth Provider - ${type}`
    const tokens = await processCodeGrant(args)
    return providers[type].onConnected(tokens)
  } catch (e) {
    Sentry.captureException(e)
    throw new AuthenticationError(e)
  }
}
