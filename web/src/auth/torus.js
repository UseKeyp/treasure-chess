import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/utils/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

const torus = new DirectWebSdk({
  baseUrl: `${window.location.origin}/auth`,
  network: 'testnet',
  enableLogging: !isProduction,
})

export const fetchWalletAddress = async () => {
  await torus.init()

  const idToken = localStorage.getItem(LOCAL_TOKEN_KEY)

  const { privateKey, publicAddress } = await torus.getTorusKey(
    'treasure-chess-testnet',
    'b1ee4d0a-c94c-11eb-8701-5dd23c44381c',
    { verifier_id: 'b1ee4d0a-c94c-11eb-8701-5dd23c44381c' },
    idToken
  )
  console.log({ publicAddress, privateKey })
  return publicAddress
}
