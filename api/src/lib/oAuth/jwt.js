import { verify as verifyJwt, decode as decodeJwt } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { promisify } from 'util'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import productionJwks from 'src/lib/oAuth/jwks'
import { getChessBasicAuth, refreshChessTokens } from 'src/lib/oAuth/chess'
import { logger } from 'src/lib/logger'

const API_URL = process.env.CHESS_OAUTH_URL

const getKey = async (header) => {
  const client = jwksClient({
    jwksUri: `${API_URL}/certs`,
    requestHeaders: {
      Authorization: `Basic ${getChessBasicAuth()}`,
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

  /* eslint-disable-next-line no-constant-condition */
  if (new Date(payload.exp * 1000) > new Date()) {
    idToken = await getNewIdToken(payload.user_id)
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
  return { decoded, newJwt: idToken }
}

export const getNewIdToken = async (userId) => {
  try {
    const { refreshToken } = await db.member.findUnique({
      where: { id: userId },
    })
    const { refreshToken: newRefreshToken, idToken } = await refreshChessTokens(
      refreshToken
    )
    await db.member.update({
      where: { id: userId },
      data: {
        refreshToken: newRefreshToken,
      },
    })
    return idToken
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(e)
    throw new AuthenticationError('getNewIdToken() Unable to refresh session')
  }
}
