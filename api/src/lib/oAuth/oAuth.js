import { AuthenticationError } from '@redwoodjs/graphql-server'
import { v4 as uuidv4 } from 'uuid'
import pkceChallenge from 'pkce-challenge'
import Sentry from 'src/lib/sentry'

import { db } from 'src/lib/db'

import {
  CHESS,
  chessParams,
  getChessAccessTokenFromCode,
} from 'src/lib/oAuth/chess'

import {
  COINBASE,
  coinbaseParams,
  getCoinbaseAccessTokenFromCode,
} from 'src/lib/oAuth/coinbase'

export const oAuthUrl = async (type) => {
  let url
  let params
  const pkce = pkceChallenge()
  if (type === CHESS) {
    params = chessParams
    url = new URL('authorize', process.env.CHESS_OAUTH_URL)
    url.searchParams.set('code_challenge', pkce.code_challenge) // eg. 3uWDl1fX2ioAqf38eSOFlKnxVEl_VyfaYKG2GyLndKs
    url.searchParams.set('code_challenge_method', 'S256')
  } else if (type === COINBASE) {
    params = coinbaseParams
    url = new URL('https://www.coinbase.com/oauth/authorize')
  }
  Object.keys(params).map((key) => {
    url.searchParams.set(key, params[key])
  })
  const state = uuidv4()
  await db.oAuth.create({
    data: {
      state,
      codeVerifier: pkce.code_verifier,
      codeChallenge: pkce.code_challenge,
    },
  })

  url.searchParams.set('response_type', 'code')
  url.searchParams.set('state', state)
  url.searchParams.set('prompt', 'none')
  return {
    text: 'success',
    type: 'redirect',
    url: url.href,
  }
}

export const validateCodeGrant = async ({ state, code, type }) => {
  try {
    // Delete the OAuth Item
    let oAuth
    console.log(`validateCodeGrant ${type} ${code} ${state}`)
    try {
      oAuth = await db.oAuth.delete({ where: { state } })
      if (!oAuth) throw 'state not valid'
    } catch (e) {
      throw 'Oauth state has expired. Please try logging in again.'
    }

    // Check expiration
    if (new Date() - new Date(oAuth.createdAt) > 10 * 60 * 1000)
      throw 'Sorry, authentication must be completed within 10 minutes.'

    if (type === CHESS) {
      return getChessAccessTokenFromCode(code, oAuth.codeVerifier)
    } else if (type === COINBASE) {
      return getCoinbaseAccessTokenFromCode(code, oAuth.codeVerifier)
    }
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError(e)
  }
}
