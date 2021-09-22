import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/api'
import jwt from 'jsonwebtoken'

const API_URL = process.env.CHESS_OAUTH_URL

export const CHESS_SCOPE = 'openid profile'

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

export const verifyChessJwt = (token) => jwt.verify(token)

export const getChessAccessTokenFromCode = async (code, codeVerifier) => {
  try {
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.CHESS_CLIENT_ID,
      redirect_uri: process.env.PUBLIC_REDIRECT_URL + '/chess',
      code,
      code_verifier: codeVerifier,
    }
    const encodedBody = Object.keys(body)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
      )
      .join('&')
    console.log(encodedBody.split('&'))
    console.log(process.env.CHESS_BASIC_AUTH)
    const response = await fetch(API_URL + '/token', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // ...(process.NODE_ENV === 'development' && {
        //   Authorization: `Basic ${process.env.CHESS_BASIC_AUTH}`,
        // }), // Basic auth required for oauth.chess-x.com development server
        Authorization: `Basic ${process.env.CHESS_BASIC_AUTH}`,
      },
    }).then((res) => {
      if (res.status == 401) throw new 'Chess.com basic authorization failed'()
      return res.json()
    })
    if (response.error)
      throw `${response.error} - ${response.hint} ${response.message}`

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiration,
      id_token: idToken, // JWT that contains identity information about user
    } = response
    if (!response.id_token) throw 'Failed to get id_token from Chess.com'
    return {
      accessToken,
      refreshToken,
      expiration: getExpiration(expiration),
      idToken,
      user: verifyChessJwt(idToken),
    }
  } catch (e) {
    throw `getChessAccessTokenFromCode() ${e}`
  }
}
