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
import { logger } from 'src/lib/logger'

let config = {
  network: 'ropsten',
  proxyAddress: '0x6258c9d6c12ed3edda59a1a6527e469517744aa7',
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

export const getTorusPublicAddress = async (userId) => {
  try {
    const idToken = await getNewIdToken(userId)
    /* eslint-disable camelcase */
    const { user_id: verifierId } = decodeJwt(idToken)
    const verifierDetails = {
      verifier: process.env.TORUS_VERIFIER,
      verifierId: verifierId,
    }
    const { torusNodeEndpoints, torusNodePub } =
      await fetchNodeDetails.getNodeDetails(verifierDetails)

    const publicAddress = await torusUtils.getPublicAddress(
      torusNodeEndpoints,
      torusNodePub,
      verifierDetails
    )
    return publicAddress.toLowerCase()
  } catch (e) {
    logger.error(e)
  }
}

export const getTorusWallet = async (userId) => {
  try {
    const idToken = await getNewIdToken(userId)
    /* eslint-disable camelcase */
    const { user_id: verifierId } = decodeJwt(idToken)
    const verifierDetails = {
      verifier: process.env.TORUS_VERIFIER,
      verifierId: verifierId,
    }

    const hashedIdToken = keccak256(idToken)

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
    const { ethAddress, privKey } = retrieveSharesResponse
    return { publicAddress: ethAddress, privateKey: privKey }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(e)
  }
}
