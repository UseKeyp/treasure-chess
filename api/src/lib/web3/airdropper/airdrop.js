const Wallet = require('@ethersproject/wallet')
const parseEther = require('@ethersproject/units')
const { getProviderByChainId } = require('src/lib/web3/helpers')

const wallet = Wallet.fromMnemonic(
  process.env.PAYER_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (wallet.address.toLowerCase() !== process.env.PAYER_WALLET_ADDRESS.toLowerCase())
    throw 'Airdropper wallet address and mnemonic do not match'
}

const airdropGasTransaction = async (toAddress, value, chainId) => {
  try {
    const tx = {
      to: toAddress,
      value: parseEther(value),
    }
    validateConfig(wallet)
    const provider = getProviderByChainId(chainId)
    const walletWithProvider = await wallet.connect(provider)
    return await walletWithProvider.sendTransaction(tx)
  } catch (e) {
    throw new Error('airdropGasTransaction() ', e)
  }
}

module.exports = airdropGasTransaction
