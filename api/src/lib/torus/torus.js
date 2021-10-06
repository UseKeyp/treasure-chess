global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/lib/helpers'
import { getNewIdToken } from 'src/lib/oAuth/jwt'
import { decode as decodeJwt } from 'jsonwebtoken'

const torus = new DirectWebSdk({
  baseUrl: `https://0.0.0.0:8910/auth`, // Dummy required placeholder, no need to change
  network: isProduction ? 'mainnet' : 'testnet', // also option for 'development'
  enableLogging: false, // SECURITY WARNING: Better to always leave false
})

export const getTorusPublicAddress = async (userId) => {
  const { publicAddress } = await torus.getPublicAddress({
    verifier: process.env.TORUS_VERIFIER,
    verifierId: userId,
  })
  return publicAddress
}

const getTorusWallet = async (userId) => {
  try {
    const idToken = await getNewIdToken(userId)
    /* eslint-disable-next-line camelcase */
    const { user_id } = decodeJwt(idToken)
    await torus.init({ skipSw: true })
    const { privateKey, publicAddress } = await torus.getTorusKey(
      process.env.TORUS_VERIFIER,
      user_id,
      { verifier_id: user_id },
      idToken
    )
    // TODO: Add logging here
    return { publicAddress, privateKey }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
  }
}
