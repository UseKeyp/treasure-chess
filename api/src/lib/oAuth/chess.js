import fetch from 'cross-fetch'
import Sentry from 'src/lib/sentry'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { db } from 'src/lib/db'

import { isDevelopment } from 'src/lib/helpers'
import { decode as decodeJwt } from 'jsonwebtoken'

import { fetchMember } from 'src/lib/members'
import { getTorusPublicAddress } from 'src/lib/torus/torus'
import { encodeBody, getExpiration } from 'src/lib/oAuth/helpers'

export const CHESS = 'chess'
const CHESS_SCOPE = 'openid profile'
export const CHESS_OAUTH_URL = process.env.CHESS_OAUTH_URL
const CHESS_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/chess'
export const chessParams = {
  client_id: process.env.CHESS_CLIENT_ID,
  scope: CHESS_SCOPE,
  redirect_uri: CHESS_REDIRECT_URI,
}

export const getChessBasicAuth = () =>
  Buffer.from(
    process.env.CHESS_BASIC_AUTH_USERNAME +
      ':' +
      process.env.CHESS_BASIC_AUTH_PASSWORD
  ).toString('base64')

export const getChessAccessTokenFromCode = async (
  code,
  { codeVerifier, memberId }
) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.CHESS_CLIENT_ID,
      client_secret: process.env.CHESS_CLIENT_SECRET,
      redirect_uri: CHESS_REDIRECT_URI,
      code,
      code_verifier: codeVerifier,
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
        throw 'Chess.com basic authorization failed, or secret invalid'
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint}. ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
      id_token: idToken, // JWT that contains identity information about user
    } = response

    // Uncomment to get a new CHESS_API_ACCESS_TOKEN
    // console.log(accessToken)

    if (!response.id_token) throw 'Failed to get id_token from Chess.com'
    const decoded = await decodeJwt(idToken)
    if (new Date() - new Date(decoded.iat * 1000) > 60 * 1000)
      throw 'Chess.com token was not issued recently. It must be <1 minute old.'
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      idToken,
      decoded,
      idTokenExpiration: new Date(decoded.exp * 1000),
      memberId,
    }
  } catch (e) {
    throw `getChessAccessTokenFromCode() ${e}`
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

export const handleChessLogin = async ({ refreshToken, decoded }) => {
  try {
    // Create member if needed, and get current avatar
    const member = await fetchMember(decoded.preferred_username, true)
    // TODO: Don't convert to string once type is changed in JWT (waiting on Chess.com)
    if (decoded.user_id.toString() !== member.id)
      throw new AuthenticationError(
        `user_id in JWT doesn't match player_id from API`
      )

    await db.member.update({
      where: { id: member.id },
      data: {
        refreshToken,
        // NOTE: Updates user with their current avatar and country
        imageSrc: member.imageSrc,
        country: member.country,
        ...(member.masterTitle && { masterTitle: member.masterTitle }),
      },
    })

    // NOTE: Get Torus wallet address if needed.
    if (!member.address) {
      try {
        const publicAddress = await getTorusPublicAddress(member.id)
        await db.member.update({
          where: { id: member.id },
          data: { address: publicAddress },
        })
      } catch (e) {
        /* eslint-disable no-console */
        console.log("Error fetching user's wallet from Torus")
        console.log(e)
        /* eslint-enable no-console */
      }
    }
    return member
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw new AuthenticationError()
  }
}
