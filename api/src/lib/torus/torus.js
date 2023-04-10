global.fetch = require('node-fetch')
global.atob = require('atob')
global.window = null
global.document = null

import TorusUtils from '@toruslabs/torus.js/dist/torusUtils-node'

import { getNewIdToken } from 'src/lib/oAuth/jwt'
import { decode as decodeJwt } from 'jsonwebtoken'
import { keccak256 } from 'web3-utils'
import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

const NodeDetailManager =
  require('@toruslabs/fetch-node-details/dist/fetchNodeDetails-node.js').default
// This require causes an issue for some reason
// const TorusUtils =
//   require('@toruslabs/torus.js/dist/torusUtils-node.js').default

const config = isProduction
  ? {
      network: 'cyan',
      proxyAddress: NodeDetailManager.PROXY_ADDRESS_CYAN,
    }
  : {
      network: 'testnet',
      proxyAddress: NodeDetailManager.PROXY_ADDRESS_TESTNET,
    }

const nodeDetailManager = new NodeDetailManager(config)

const TORUS_VERIFIER = isProduction
  ? 'treasure-chess-prod-1'
  : 'treasure-chess-sandbox-aggregate'

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
      verifier: TORUS_VERIFIER,
      verifierId: verifierId,
    }
    const { torusNodeEndpoints, torusNodePub } =
      await nodeDetailManager.getNodeDetails(verifierDetails)

    const publicAddress = await torusUtils.getPublicAddress(
      torusNodeEndpoints,
      torusNodePub,
      verifierDetails
    )
    logger.debug(`getTorusPublicAddress ${publicAddress}`)
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
      verifier: TORUS_VERIFIER,
      verifierId: verifierId,
    }

    const hashedIdToken = keccak256(idToken)

    const { torusNodeEndpoints, torusIndexes } =
      await nodeDetailManager.getNodeDetails(verifierDetails)
    const retrieveSharesResponse = await torusUtils.retrieveShares(
      torusNodeEndpoints,
      torusIndexes,
      TORUS_VERIFIER,
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
