import { Wallet } from '@ethersproject/wallet'
import { web3Provider } from 'src/lib/web3/helpers'

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
    const adminWalletWithProvider = adminWallet.connect(web3Provider)
    return adminWalletWithProvider.sendTransaction(unsigned)
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('adminSendTransaction() ', e)
  }
}
