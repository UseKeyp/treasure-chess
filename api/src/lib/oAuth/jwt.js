import {
  sign as signJwt,
  verify as verifyJwt,
  decode as decodeJwt,
} from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import { promisify } from 'util'

import { isDevelopment } from 'src/lib/helpers'

import productionJwks from 'src/lib/oAuth/jwks'
import { CHESS_BASIC_AUTH } from 'src/lib/oAuth/chessDotCom'

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
  const pubKey = await getKey(decodeJwt(jwt, { complete: true }).header)
  const decoded = verifyJwt(
    jwt,
    pubKey,
    {
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) throw err
      return decoded
    }
  )
  if (new Date() - new Date(decoded.iat * 1000) > 60 * 1000)
    throw 'Chess.com token was not issued recently. It must be <1 minute old.'
  return decoded
}
