global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/lib/helpers'
import { decode as decodeJwt } from 'jsonwebtoken'

const torus = new DirectWebSdk({
  baseUrl: `https://0.0.0.0:8910/auth`, // Required placeholder
  network: 'testnet',
  enableLogging: !isProduction,
})

const VERIFIER = process.env.TORUS_VERIFIER

export const getTorusKey = async (idToken) => {
  // TODO: Rotate keys

  await torus.init({ skipSw: true })
  const { sub } = decodeJwt(idToken)
  const { privateKey, publicAddress } = await torus.getTorusKey(
    VERIFIER,
    sub,
    { verifier_id: sub },
    idToken
  )
  return { publicAddress, privateKey }
}
