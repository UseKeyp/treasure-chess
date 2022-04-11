import { Wallet } from '@ethersproject/wallet'
import { web3Provider } from 'src/lib/web3/helpers'

import { logger } from 'src/lib/logger'
const adminWallet = Wallet.fromMnemonic(
  process.env.APP_ADMIN_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (
    wallet.address.toLowerCase() !==
    process.env.APP_ADMIN_WALLET_ADDRESS.toLowerCase()
  )
    throw 'Admin wallet address and mnemonic do not match'
}

export const adminSign = async (unsigned) =>
  adminWallet.signTransaction(unsigned)

export const adminSendTransaction = async (unsigned) => {
  validateConfig(adminWallet)
  try {
    logger.debug({ custom: web3Provider.connection }, 'web3Provider')
    const adminWalletWithProvider = adminWallet.connect(web3Provider)
    const nonce = await web3Provider.getTransactionCount(adminWallet.address)
    logger.debug(`Admin wallet transactionCount: ${nonce}`)
    return await adminWalletWithProvider.sendTransaction({
      ...unsigned,
      type: 2,
    })
  } catch (e) {
    logger.error(e)
    throw new Error(`adminSendTransaction() ${e}`)
  }
}
