global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/lib/helpers'
import { getNewIdToken } from 'src/lib/oAuth/jwt'
import { decode as decodeJwt } from 'jsonwebtoken'

const torus = new DirectWebSdk({
  baseUrl: `https://0.0.0.0:8910/auth`, // Required placeholder, no need to change
  network: isProduction ? 'mainnet' : 'testnet', // or 'development'
  enableLogging: !isProduction,
})

export const getTorusPublicAddress = async (userId) => {
  const { publicAddress } = await getTorusKey(userId)
  return publicAddress
}

const getTorusKey = async (userId) => {
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
    return { publicAddress, privateKey }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    return {
      // TODO: Remove hadcoded test wallet
      // WARNING: Totally unsecure test wallet. Do not send real funds here.
      publicAddress: '0x9771f6081Dc50Ab1226CEC29aEa3C6f2D0a3A09E',
      privateKey:
        '0x46e6a254dcb9c917aed7b699b8229943340eab942635d268ef55bf3c9402eb91',
    }
  }
}
