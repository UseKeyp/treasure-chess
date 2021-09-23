import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/api'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { promisify } from 'util'

import { isDevelopment } from 'src/lib/helpers'

import productionJwks from 'src/lib/oAuth/jwks'

const API_URL = process.env.CHESS_OAUTH_URL
export const CHESS_SCOPE = 'openid profile'

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

const getKey = async (header) => {
  const client = jwksClient({
    jwksUri: `${API_URL}/certs`,
    requestHeaders: {
      Authorization: `Basic ${process.env.CHESS_BASIC_AUTH}`,
    },
    timeout: 30000, // Defaults to 30s
    getKeysInterceptor: () => productionJwks, // Checks production keys vefore jwksUri
  })
  const getPubKey = promisify(client.getSigningKey)
  const key = await getPubKey(header.kid)
  const pubKey = key.getPublicKey()
  return pubKey
}

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
    // console.log(encodedBody.split('&'))
    const response = await fetch(API_URL + '/token', {
      method: 'post',
      body: encodedBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Basic auth required for oauth.chess-x.com development server
        ...(isDevelopment && {
          Authorization: `Basic ${process.env.CHESS_BASIC_AUTH}`,
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
    const pubKey = await getKey(jwt.decode(idToken, { complete: true }).header)
    const user = jwt.verify(
      idToken,
      pubKey,
      {
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) throw err
        return decoded
      }
    )
    return {
      accessToken,
      refreshToken,
      expiration: getExpiration(expiration),
      idToken,
      user,
    }
    return
  } catch (e) {
    throw `getChessAccessTokenFromCode() ${e}`
  }
}
