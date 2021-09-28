import {
  sign as signJwt,
  verify as verifyJwt,
  decode as decodeJwt,
} from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { promisify } from 'util'
import { id } from '@ethersproject/hash'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { isDevelopment } from 'src/lib/helpers'
import productionJwks from 'src/lib/oAuth/jwks'
import { CHESS_BASIC_AUTH, refreshChessTokens } from 'src/lib/oAuth/chessDotCom'

const API_URL = process.env.CHESS_OAUTH_URL

const getKey = async (header) => {
  const client = jwksClient({
    jwksUri: `${API_URL}/certs`,
    requestHeaders: {
      Authorization: `Basic ${CHESS_BASIC_AUTH}`,
    },
    timeout: 30000, // Defaults to 30s
    getKeysInterceptor: () => productionJwks, // Checks production keys vefore jwksUri
  })
  const getPubKey = promisify(client.getSigningKey)
  const key = await getPubKey(header.kid)
  const pubKey = key.getPublicKey()
  return pubKey
}

export const verifyChessJwt = async (jwt) => {
  // Refresh if necessary
  let idToken = jwt
  let decoded = decodeJwt(idToken, { complete: true })
  // TODO: remove true check
  if (true) {
    // if (new Date(decoded.exp * 1000) > new Date()) {
    idToken = await refreshJwt(idToken)
    decoded = decodeJwt(idToken, { complete: true })
  }
  const pubKey = await getKey(decoded.header)
  const verified = verifyJwt(
    idToken,
    pubKey,
    {
      algorithms: ['RS256'],
    },
    (err, _decoded) => {
      if (err) throw err
      return _decoded
    }
  )
  return verified
}

const refreshJwt = async (idToken) => {
  try {
    const decoded = decodeJwt(idToken)
    const member = await db.member.findUnique({ where: { id: decoded.sub } })
    // Prevents JWT attacks, and restricts renewal to the current session only
    if (id(idToken) !== member.hashedIdToken)
      throw new AuthenticationError('Session expired, please log in again.')
    const {
      accessToken,
      accessTokenExpiration,
      refreshToken,
      idTokenExpiration,
      idToken,
    } = await refreshChessTokens(member.refreshToken)
    await db.member.update({
      where: { id: member.id },
      data: {
        accessToken,
        accessTokenExpiration,
        refreshToken,
        idTokenExpiration,
        hashedIdToken: id(idToken),
      },
    })
    return idToken
  } catch (e) {
    console.log(idToken)
    console.log(e)
    throw new AuthenticationError(
      'Unable to refresh session. Please log in again.'
    )
  }
}
