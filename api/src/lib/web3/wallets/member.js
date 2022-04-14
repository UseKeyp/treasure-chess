import { Wallet } from '@ethersproject/wallet'
import { web3Provider, getGasSettings } from 'src/lib/web3/helpers'

import { getTorusWallet } from 'src/lib/torus'
import { logger } from 'src/lib/logger'

export const memberSendTransaction = async ({ memberId, unsignedTx }) => {
  try {
    const torusWallet = await getTorusWallet(memberId)
    const memberWalletWithProvider = new Wallet(
      torusWallet.privateKey,
      web3Provider
    )
    const gasSettings = await getGasSettings()
    return memberWalletWithProvider.sendTransaction({
      ...unsignedTx,
      ...gasSettings,
    })
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    logger.error(e)
    throw new Error('memberSendTransaction() ', e)
  }
}
