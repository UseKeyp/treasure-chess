import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { isDevelopment } from 'src/lib/helpers'
import { verifyChessJwt } from 'src/lib/oAuth/jwt'

const API_URL = process.env.CHESS_OAUTH_URL
export const CHESS_SCOPE = 'openid profile'

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

const encodeBody = (body) =>
  Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')

export const CHESS_BASIC_AUTH = Buffer.from(
  process.env.CHESS_BASIC_AUTH_USERNAME +
    ':' +
    process.env.CHESS_BASIC_AUTH_PASSWORD
).toString('base64')

export const getChessAccessTokenFromCode = async (code, codeVerifier) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.CHESS_CLIENT_ID,
      redirect_uri: process.env.PUBLIC_REDIRECT_URL + '/chess',
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    // console.log(encodedBody.split('&'))
    const response = await fetch(API_URL + '/token', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Basic auth required for oauth.chess-x.com development server
        ...(isDevelopment && {
          Authorization: `Basic ${CHESS_BASIC_AUTH}`,
        }),
      },
    }).then((res) => {
      if (res.status == 401) throw new 'Chess.com basic authorization failed'()
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
    if (!response.id_token) throw 'Failed to get id_token from Chess.com'
    const decodedIdToken = await verifyChessJwt(idToken)
    return {
      accessToken,
      accessTokenExpiration: getExpiration(expiration),
      refreshToken,
      idToken,
      decodedIdToken,
      idTokenExpiration: new Date(decodedIdToken.exp * 1000),
    }
    return
  } catch (e) {
    throw `getChessAccessTokenFromCode() ${e}`
  }
}

export const refreshChessTokens = async (refreshToken, id) => {
  try {
    const body = {
      grant_type: 'refresh_token',
      client_id: process.env.CHESS_CLIENT_ID,
      // redirect_uri: process.env.PUBLIC_REDIRECT_URL + '/chess',
      refresh_token: refreshToken,
    }
    const encodedBody = encodeBody(body)
    const response = await fetch(API_URL + '/token', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ...(isDevelopment && {
          Authorization: `Basic ${CHESS_BASIC_AUTH}`,
        }),
      },
    }).then((res) => {
      if (res.status == 401) throw new 'Chess.com basic authorization failed'()
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
    if (!accessToken || !refreshToken)
      throw 'Failed to refresh tokens from Chess.com'

    const decodedIdToken = await verifyChessJwt(newIdToken)
    const newExpirationDate = getExpiration(newExpiration)
    const idTokenExpiration = new Date(decodedIdToken.exp * 1000)
    await db.user.update({
      where: { id: decodedIdToken.sub },
      data: {
        accessToken: newAccessToken,
        accessTokenExpiration: newExpirationDate,
        refreshToken: newRefreshToken,
        idTokenExpiration,
      },
    })
    return {
      accessToken: newAccessToken,
      accessTokenExpiration: newExpirationDate,
      refreshToken: newRefreshToken,
      idToken: newIdToken,
      decodedIdToken,
      idTokenExpiration,
    }
  } catch (e) {
    throw `refreshChessTokens() ${e}`
  }
}
