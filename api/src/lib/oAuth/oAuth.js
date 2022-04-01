import { AuthenticationError } from '@redwoodjs/graphql-server'
import { v4 as uuidv4 } from 'uuid'
import pkceChallenge from 'pkce-challenge'
import Sentry from 'src/lib/sentry'

import { db } from 'src/lib/db'

import { providers, types } from 'src/lib/oAuth/providers'
import { logger } from 'src/lib/logger'
import { createPlaidLink, PLAID } from 'src/lib/oAuth/providers/plaid'

export const oAuthUrl = async (type) => {
  try {
    if (!Object.values(types).includes(type))
      throw `OAuth Provider ${type} is not enabled.`
    if (type === types[PLAID]) {
      const plaidLink = await createPlaidLink()
      return {
        text: plaidLink,
        type: 'code',
      }
    }
    const { params, urlAuthorize } = providers[type]
    const url = new URL(urlAuthorize)
    const pkce = pkceChallenge()
    url.searchParams.set('code_challenge', pkce.code_challenge) // eg. 3uWDl1fX2ioAqf38eSOFlKnxVEl_VyfaYKG2GyLndKs
    url.searchParams.set('code_challenge_method', 'S256')
    Object.keys(params).map((key) => {
      url.searchParams.set(key, params[key])
    })
    const state = uuidv4()
    // For oAuth codeGrant, we sometimes need the user id
    let userId
    if (context.currentUser?.id) userId = context.currentUser?.id

    await db.oAuth.create({
      data: {
        state,
        codeVerifier: pkce.code_verifier,
        codeChallenge: pkce.code_challenge,
        ...(userId && { member: { connect: { id: userId } } }),
      },
    })

    url.searchParams.set('response_type', 'code')
    url.searchParams.set('state', state)
    return {
      text: 'success',
      type: 'redirect',
      url: url.href,
    }
  } catch (e) {
    /* eslint-disable no-console */
    logger.error(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError(e)
  }
}

export const processCodeGrant = async ({ state, code, type }) => {
  try {
    if (!Object.values(types).includes(type))
      throw `OAuth Provider "${type}" is not enabled.`
    // Delete the OAuth Item
    let oAuth
    try {
      oAuth = await db.oAuth.delete({ where: { state } })
      if (!oAuth) throw 'state not valid'
    } catch (e) {
      throw 'Oauth state has expired. Please start over.'
    }

    // Check expiration
    if (new Date() - new Date(oAuth.createdAt) > 10 * 60 * 1000)
      throw 'Sorry, authentication must be completed within 10 minutes.'

    const { onSubmitCode } = providers[type]
    return onSubmitCode(code, { memberId: oAuth.memberId })
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError(e)
  }
}
