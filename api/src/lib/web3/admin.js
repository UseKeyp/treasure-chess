import { Wallet } from '@ethersproject/wallet'
import { getProviderByChainId } from 'src/lib/web3/helpers'

const wallet = Wallet.fromMnemonic(
  process.env.APP_ADMIN_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (
    wallet.address.toLowerCase() !==
    process.env.APP_ADMIN_WALLET_ADDRESS.toLowerCase()
  )
    throw 'Admin wallet address and mnemonic do not match'
}

export const adminSign = async (unsigned) => wallet.signTransaction(unsigned)

export const adminSendTransaction = async (unsigned, chainId) => {
  validateConfig(wallet)
  try {
    const provider = getProviderByChainId(chainId)
    const walletWithProvider = wallet.connect(provider)
    return walletWithProvider.sendTransaction(unsigned)
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    // console.log(e)
    throw new Error('adminSendTransaction() ', e)
  }
}
