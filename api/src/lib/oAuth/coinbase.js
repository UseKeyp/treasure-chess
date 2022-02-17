import fetch from 'cross-fetch'
import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

import { isDevelopment } from 'src/lib/helpers'
import { decode as decodeJwt } from 'jsonwebtoken'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'

export const COINBASE = 'coinbase'

export const coinbaseParams = {
  client_id: process.env.COINBASE_CLIENT_ID,
  scope: 'wallet:addresses:read wallet:user:email',
  redirect_uri: process.env.APP_DOMAIN + '/redirect/coinbase',
  referral: 'gallag_jq',
  account_currency: 'ETH',
}

export const getCoinbaseAccessTokenFromCode = async (code, codeVerifier) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.COINBASE_CLIENT_ID,
      client_secret: process.env.COINBASE_CLIENT_SECRET,
      redirect_uri: process.env.APP_DOMAIN + '/redirect/coinbase',
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    // console.log(encodedBody.split('&'))
    const response = await fetch('https://www.coinbase.com/oauth/authorize', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Basic auth required for oauth.chess-x.com development server
        ...(isDevelopment && {
          Authorization: `Basic ${getChessBasicAuth()}`,
        }),
      },
    }).then((res) => {
      if (res.status == 401)
        throw 'Chess.com basic authorization failed, or secret invalid'
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
    } = response

    if (!refreshToken) throw 'Failed to get refresh_token from Chess.com'
    console.log(accessToken)
    // return {
    //   accessToken,
    //   accessTokenExpiration: getExpiration(expiration),
    //   refreshToken,
    // }
    // TODO:
    // Fetch Coinbase ETH address
    // Save address and tokens to database
    // Return success ?
  } catch (e) {
    throw `getCoinbaseAccessTokenFromCode() ${e}`
  }
}

export const refreshChessTokens = async (refreshToken) => {
  try {
    const body = {
      grant_type: 'refresh_token',
      client_id: process.env.CHESS_CLIENT_ID,
      client_secret: process.env.CHESS_CLIENT_SECRET,
      refresh_token: refreshToken,
      scope: CHESS_SCOPE,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(process.env.CHESS_OAUTH_URL + '/token', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Basic auth required for oauth.chess-x.com development server
        ...(isDevelopment && {
          Authorization: `Basic ${getChessBasicAuth()}`,
        }),
      },
    }).then((res) => {
      if (res.status == 401)
        throw new Error('Chess.com basic authorization failed')
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`
    const {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      expires_in: newExpiration,
      id_token: newIdToken, // JWT that contains identity information about user
    } = response
    if (!newAccessToken || !newRefreshToken || !newIdToken)
      throw 'Failed to refresh tokens from Chess.com'
    const newExpirationDate = getExpiration(newExpiration)
    const decoded = decodeJwt(newIdToken)
    const idTokenExpiration = new Date(decoded.exp * 1000)
    return {
      accessToken: newAccessToken,
      accessTokenExpiration: newExpirationDate,
      refreshToken: newRefreshToken,
      idToken: newIdToken,
      idTokenExpiration,
    }
  } catch (e) {
    throw `refreshChessTokens() ${e}`
  }
}

export const handleCoinbaseLogin = async ({ refreshToken, decoded }) => {}
