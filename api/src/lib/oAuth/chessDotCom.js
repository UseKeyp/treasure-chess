import fetch from 'cross-fetch'

import { isDevelopment } from 'src/lib/helpers'
import { decode as decodeJwt } from 'jsonwebtoken'

export const CHESS_SCOPE = 'openid profile'

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

const encodeBody = (body) =>
  Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')

export const getChessBasicAuth = () =>
  Buffer.from(
    process.env.CHESS_BASIC_AUTH_USERNAME +
      ':' +
      process.env.CHESS_BASIC_AUTH_PASSWORD
  ).toString('base64')

export const getChessAccessTokenFromCode = async (code, codeVerifier) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.CHESS_CLIENT_ID,
      client_secret: process.env.CHESS_CLIENT_SECRET,
      redirect_uri: process.env.PUBLIC_REDIRECT_URL + '/chess',
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = encodeBody(body)
    // console.log(encodedBody.split('&'))
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
