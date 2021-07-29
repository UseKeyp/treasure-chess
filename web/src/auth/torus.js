import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/utils/helpers'

export const torus = new DirectWebSdk({
  baseUrl: `${window.location.origin}/auth`,
  enableLogging: !isProduction,
  network: 'testnet', // details for test net
})

export const loginWithTorus = async () =>
  await torus.triggerLogin({
    // await torus.getTorusKey({
    // TODO: Get from ENV Variables
    verifier: 'treasure-chess-testnet',
    verifierId: 'sub',
    verifierParams: { verifier_id: 'sub' },
    // TODO: Get from ENV Variables
    idToken: '698dc2de-bf15-11eb-8440-23c93af1e66f',
    // Needed for passing the check
    typeOfLogin: 'jwt',
    jwtParams: {
      // TODO: Get from ENV Variables
      domain: 'https://oauth.chess-4.com',
    },
    // TODO: Do we really need to provide this?
    clientId: '698dc2de-bf15-11eb-8440-23c93af1e66f',
  })
