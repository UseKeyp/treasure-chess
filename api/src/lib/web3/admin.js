import { Wallet } from '@ethersproject/wallet'
import { getProviderByChainId } from 'src/lib/web3/helpers'

const wallet = Wallet.fromMnemonic(process.env.APP_ADMIN_WALLET_MNEMONIC)

export const adminSign = async (unsigned) => wallet.signTransaction(unsigned)

export const adminSendTransaction = async (unsigned, chainId) => {
  const provider = getProviderByChainId(chainId)
  const walletWithProvider = wallet.connect(provider)
  walletWithProvider.sendTransaction(unsigned)
}
