import { Wallet } from '@ethersproject/wallet'

import { getTorusWallet } from 'src/lib/torus'
import { web3Provider } from 'src/lib/web3/helpers'

export const memberSendTransaction = async ({ memberId, unsignedTx }) => {
  try {
    const torusWallet = await getTorusWallet(memberId)
    const memberWalletWithProvider = new Wallet(
      torusWallet.privateKey,
      web3Provider
    )
    return memberWalletWithProvider.sendTransaction(unsignedTx)
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('memberSendTransaction() ', e)
  }
}
