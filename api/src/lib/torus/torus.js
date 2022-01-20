global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import FetchNodeDetails from '@toruslabs/fetch-node-details/dist/fetchNodeDetails-node'
import TorusUtils from '@toruslabs/torus.js/dist/torusUtils-node'

import { getNewIdToken } from 'src/lib/oAuth/jwt'
import { decode as decodeJwt } from 'jsonwebtoken'

const fetchNodeDetails = new FetchNodeDetails(
  process.env.TORUS_VERIFIER === 'treasure-chess-sandbox' && {
    network: 'ropsten',
    proxyAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183',
  }
)
const torusUtils = new TorusUtils()

export const getTorusPublicAddress = async (userId) => {
  const { torusNodeEndpoints, torusNodePub } =
    await fetchNodeDetails.getNodeDetails(false, true)
  const publicAddress = await torusUtils.getPublicAddress(
    torusNodeEndpoints,
    torusNodePub,
    { verifier: process.env.TORUS_VERIFIER, verifierId: userId }
  )
  return publicAddress
}

export const getTorusWallet = async (userId) => {
  try {
    const idToken = await getNewIdToken(userId)
    /* eslint-disable camelcase */
    const { user_id } = decodeJwt(idToken)

    const { torusNodeEndpoints, torusIndexes } =
      await fetchNodeDetails.getNodeDetails(false, true)
    const { ethAddress: publicAddress, privKey: privateKey } =
      await torusUtils.retrieveShares(
        torusNodeEndpoints,
        torusIndexes,
        process.env.TORUS_VERIFIER,
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
