global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
// import FetchNodeDetails from '@toruslabs/fetch-node-details/dist/fetchNodeDetails-node'
// import TorusUtils from '@toruslabs/torus.js/dist/torusUtils-node'

import { isProduction } from 'src/lib/helpers'
import { getNewIdToken } from 'src/lib/oAuth/jwt'
import { decode as decodeJwt } from 'jsonwebtoken'

const TORUS_VERIFIER = process.env.TORUS_VERIFIER
const TORUS_NETWORK = isProduction ? 'mainnet' : 'testnet'

const torusSdk = new DirectWebSdk({
  baseUrl: `https://0.0.0.0:8910/auth`, // Dummy required placeholder, no need to change
  network: TORUS_NETWORK, // also option for 'development'
  enableLogging: false, // SECURITY WARNING: Better to always leave false
})

// const fetchNodeDetails = new FetchNodeDetails()
// const torusUtils = new TorusUtils()

export const getTorusPublicAddress = async (userId) => {
  // TODO:  fix to not depend on getTorusWallet()
  // console.log(TORUS_VERIFIER, userId)
  // const { torusNodeEndpoints, torusNodePub } =
  //   await fetchNodeDetails.getNodeDetails()
  // // also tried:
  // // await fetchNodeDetails.getNodeDetails(false, true)
  // const publicAddress = await torusUtils.getPublicAddress(
  //   torusNodeEndpoints,
  //   torusNodePub,
  //   { verifier: TORUS_VERIFIER, verifierId: userId }
  // )
  const { publicAddress } = await getTorusWallet(userId)
  return publicAddress
}

const getTorusWallet = async (userId) => {
  try {
    const idToken = await getNewIdToken(userId)
    /* eslint-disable-next-line camelcase */
    const { user_id } = decodeJwt(idToken)
    await torusSdk.init({ skipSw: true })
    const { privateKey, publicAddress } = await torusSdk.getTorusKey(
      TORUS_VERIFIER,
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
