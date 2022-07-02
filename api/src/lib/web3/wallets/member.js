import { Wallet } from '@ethersproject/wallet'
import { web3Provider, getGasSettings } from 'src/lib/web3/helpers'

import { getTorusWallet } from 'src/lib/torus'
import { logger } from 'src/lib/logger'

const getMemberWalletWithProvider = async (memberId) => {
  const torusWallet = await getTorusWallet(memberId)
  return new Wallet(torusWallet.privateKey, web3Provider)
}

export const memberSignMesage = async ({ memberId, message }) => {
  const memberWalletWithProvider = await getMemberWalletWithProvider(memberId)
  const signature = await memberWalletWithProvider.signMessage(message)
  return signature
}

export const memberSendTransaction = async ({ memberId, unsignedTx }) => {
  try {
    if (process.env.IMPERSONATE_USERNAME)
      return logger.warn(
        { custom: unsignedTx },
        'IMPERSONATE_USERNAME tx skipped'
      )

    const memberWalletWithProvider = await getMemberWalletWithProvider(memberId)
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
