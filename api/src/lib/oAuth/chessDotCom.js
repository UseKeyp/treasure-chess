import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/api'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

import { isDevelopment } from 'src/lib/helpers'

const API_URL = process.env.CHESS_OAUTH_URL
export const CHESS_SCOPE = 'openid profile'

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

const client = jwksClient({
  jwksUri: `${API_URL}/.well-known/jwks.json`,
  requestHeaders: {
    Authorization: `Basic ${process.env.CHESS_BASIC_AUTH}`,
  },
  timeout: 30000, // Defaults to 30s
})

export const verifyChessJwt = async (token) => {
  if (isDevelopment) {
    // https://oauth.chess-x.com/certs
    const response = await fetch(API_URL + '/certs', {
      headers: {
        Authorization: `Basic ${process.env.CHESS_BASIC_AUTH}`,
      },
    }).then((res) => {
      try {
        return res.json()
      } catch (e) {
        throw "Couldn't fetch oauth certs"
      }
    })
    console.log(response)
    const { keys: certs } = response
    let user
    const validCerts = certs.filter(
      (cert) => cert.use === 'sig' && cert.alg === 'RS256'
    )
    if (!validCerts) throw 'No valid keys provided by chess.com'
    validCerts.map(async (cert) => {
      try {
        const key = await client.getSigningKey(cert.kid)
        const signingKey = key.getPublicKey()
        console.log(signingKey)
        const data = jwt.verify(token, signingKey, {
          algorithms: ['RS256'],
        })
        console.log(data)
        if (data) user = data
      } catch (e) {
        console.log(e)
      }
    })
    // TODO: Remove this in favor of actually verifying the jwt
    return jwt.decode(token)
    if (!user) throw "Couldn't verify chess.com idToken"
    return user
  }
  // TODO: Update to work with jwks, as above in development environment
  return jwt.verify(token, process.env.CHESS_CERTS_KID)
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
    const user = await verifyChessJwt(idToken)
    return {
      accessToken,
      refreshToken,
      expiration: getExpiration(expiration),
      idToken,
      user,
    }
  } catch (e) {
    throw `getChessAccessTokenFromCode() ${e}`
  }
}
