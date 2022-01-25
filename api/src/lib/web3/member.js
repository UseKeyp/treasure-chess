import { Wallet } from '@ethersproject/wallet'

import { getTorusWallet } from 'src/lib/torus'
import { web3Provider } from 'src/lib/web3/helpers'

const memberWallet = Wallet.fromMnemonic(
  process.env.APP_ADMIN_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (
    wallet.address.toLowerCase() !==
    process.env.APP_ADMIN_WALLET_ADDRESS.toLowerCase()
  )
    throw 'Admin wallet address and mnemonic do not match'
}

export const memberSign = async (unsigned) =>
  memberWallet.signTransaction(unsigned)

export const memberSendTransaction = async (unsigned) => {
  try {
    const memberWalletWithProvider = memberWallet.connect(web3Provider)
    return memberWalletWithProvider.sendTransaction(unsigned)
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('memberSendTransaction() ', e)
  }
}
