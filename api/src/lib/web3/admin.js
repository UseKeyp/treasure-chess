import { Wallet } from '@ethersproject/wallet'
import { getProviderByChainId } from 'src/lib/web3/helpers'

const wallet = Wallet.fromMnemonic(process.env.APP_ADMIN_WALLET_MNEMONIC)

export const adminSign = async (unsigned) => wallet.signTransaction(unsigned)

export const adminSendTransaction = async (unsigned, chainId) => {
  try {
    const provider = getProviderByChainId(chainId)
    const walletWithProvider = wallet.connect(provider)
    walletWithProvider.sendTransaction(unsigned)
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    console.log(e)
    throw new Error('adminSendTransaction() ', e)
  }
}
