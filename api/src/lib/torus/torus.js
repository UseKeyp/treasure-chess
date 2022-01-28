global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import NodeManager from '@toruslabs/fetch-node-details/dist/fetchNodeDetails-node'
import TorusUtils from '@toruslabs/torus.js/dist/torusUtils-node'

import { getNewIdToken } from 'src/lib/oAuth/jwt'
import { decode as decodeJwt } from 'jsonwebtoken'
import { keccak256 } from 'web3-utils'
import { isProduction } from 'src/lib/helpers'

let config = {
  network: 'ropsten',
  proxyAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183',
}
if (isProduction)
  config = {
    network: 'polygon-mainnet',
    proxyAddress: '0x9f072ba19b3370e512aa1b4bfcdaf97283168005',
  }
const fetchNodeDetails = new NodeManager(config)
const torusUtils = new TorusUtils(
  isProduction
    ? {
        signerHost: 'https://signer-polygon.tor.us/api/sign',
        allowHost: 'https://signer-polygon.tor.us/api/allow',
      }
    : undefined
)

const VERIFIER_ID = 'user_id'
const verifierDetails = {
  verifier: process.env.TORUS_VERIFIER,
  verifierId: VERIFIER_ID,
}

export const getTorusPublicAddress = async (userId) => {
  try {
    if (isProduction) {
      const idToken = await getNewIdToken(userId)
      console.log({ config })
      console.log({ verifierDetails })
      console.log({ idToken })
      /* eslint-disable camelcase */
      const { user_id } = decodeJwt(idToken)
      const hashedIdToken = keccak256(idToken)

      const { torusNodeEndpoints, torusIndexes } =
        await fetchNodeDetails.getNodeDetails(verifierDetails)
      const retrieveSharesResponse = await torusUtils.retrieveShares(
        torusNodeEndpoints,
        torusIndexes,
        process.env.TORUS_VERIFIER,
        {
          verify_params: [{ verifier_id: VERIFIER_ID, idtoken: idToken }],
          sub_verifier_ids: ['chess'],
          verifier_id: VERIFIER_ID,
        },
        hashedIdToken.substring(2)
      )
      console.log(retrieveSharesResponse)
    } else {
      const { torusNodeEndpoints, torusNodePub } =
        await fetchNodeDetails.getNodeDetails(false, true)
      const publicAddress = await torusUtils.getPublicAddress(
        torusNodeEndpoints,
        torusNodePub,
        { verifier: process.env.TORUS_VERIFIER, verifierId: userId }
      )
      return publicAddress
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
  }
}
export const getTorusWallet = async (userId) => {
  try {
    if (isProduction) {
      const idToken = await getNewIdToken(userId)
      /* eslint-disable camelcase */
      const { user_id } = decodeJwt(idToken)

      const { torusNodeEndpoints, torusIndexes } =
        await fetchNodeDetails.getNodeDetails(verifierDetails)
      const retrieveSharesResponse = await torusUtils.retrieveShares(
        torusNodeEndpoints,
        torusIndexes,
        process.env.TORUS_VERIFIER,
        {
          verify_params: [{ verifier_id: verifierId, idtoken: idToken }],
          sub_verifier_ids: ['chess'],
          verifier_id: verifierId,
        },
        hashedIdToken.substring(2)
      )
    } else {
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
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
  }
}
