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
  let { header, payload } = decodeJwt(idToken, { complete: true })

  let newJwt
  // TODO: remove true check
  if (true) {
    // if (new Date(payload.exp * 1000) > new Date()) {
    newIdToken = await refreshJwt({ idToken, userId: payload.sub })
    idToken = newIdToken
    ;({ header } = decodeJwt(idToken, { complete: true }))
  }

  const pubKey = await getKey(header)
  const decoded = verifyJwt(
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
  return { decoded, newJwt }
}

const refreshJwt = async ({ idToken, userId }) => {
  try {
    const member = await db.member.findUnique({ where: { id: userId } })
    // Prevents JWT attacks, and restricts renewal to the current session only
    if (id(idToken) !== member.hashedIdToken)
      throw new AuthenticationError('Session expired, please log in again.')
    const {
      accessToken,
      accessTokenExpiration,
      refreshToken,
      idTokenExpiration,
      idToken: newIdToken,
    } = await refreshChessTokens(member.refreshToken)
    await db.member.update({
      where: { id: member.id },
      data: {
        accessToken,
        accessTokenExpiration,
        refreshToken,
        idTokenExpiration,
        hashedIdToken: id(newIdToken),
      },
    })
    return newIdToken
  } catch (e) {
    console.log(e)
    throw new AuthenticationError(
      'Unable to refresh session. Please log in again.'
    )
  }
}
