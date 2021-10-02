global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/lib/helpers'
import { decode as decodeJwt } from 'jsonwebtoken'

const torus = new DirectWebSdk({
  baseUrl: `https://0.0.0.0:8910/auth`, // Required placeholder, no need to change
  network: isProduction ? 'mainnet' : 'testnet', // or 'development'
  enableLogging: !isProduction,
})

export const getTorusKey = async (idToken) => {
  await torus.init({ skipSw: true })
  // console.log(process.env.TORUS_VERIFIER)
  // console.log(isProduction)
  // console.log(decodeJwt(idToken))
  const { user_id } = decodeJwt(idToken)
  const { privateKey, publicAddress } = await torus.getTorusKey(
    process.env.TORUS_VERIFIER,
    user_id,
    { verifier_id: user_id },
    idToken
  )
  return { publicAddress, privateKey }
}
