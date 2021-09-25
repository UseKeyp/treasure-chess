import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

import { isProduction } from 'src/lib/helpers'
import { decode as decodeJwt } from 'jsonwebtoken'

const torus = new DirectWebSdk({
  baseUrl: `https://0.0.0.0:8910/auth`,
  network: 'testnet',
  enableLogging: !isProduction,
})

export const fetchTorusWallet = async (idToken) => {
  await torus.init({ skipSw: true })
  const { sub } = decodeJwt(idToken)
  const { privateKey, publicAddress } = await torus.getTorusKey(
    'treasure-chess-testnet',
    sub,
    { verifier_id: sub },
    idToken
  )
  console.log({ publicAddress, privateKey })

  // TODO: Rotate keys

  return { publicAddress, privateKey }
}
