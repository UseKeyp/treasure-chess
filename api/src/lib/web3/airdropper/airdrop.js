const Wallet = require('@ethersproject/wallet')
const parseEther = require('@ethersproject/units')
const { web3Provider } = require('src/lib/web3/helpers')

const MINIMUM_GAS_THRESHOLD = 0.001 // Units of Ether

const payerWallet = Wallet.fromMnemonic(
  process.env.PAYER_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (
    wallet.address.toLowerCase() !==
    process.env.PAYER_WALLET_ADDRESS.toLowerCase()
  )
    throw 'Airdropper wallet address and mnemonic do not match'
}

const airdropGasTransaction = async ({ address, amount }) => {
  try {
    const tx = {
      to: toAddress,
      value: parseEther(amount),
    }
    validateConfig(payerWallet)
    const payerWalletWithProvider = await payerWallet.connect(web3Provider)
    return await payerWalletWithProvider.sendTransaction(tx)
  } catch (e) {
    throw new Error('airdropGasTransaction() ', e)
  }
}

const checkGasAndAirdrop = async ({
  address,
  amount = MINIMUM_GAS_THRESHOLD,
}) => {
  try {
    const hasGas = await hasEnoughGas({ address })
    if (!hasGas) {
      const tx = await airdropGasTransaction({ address, amount })
      return tx
    }
    return null
  } catch (e) {
    throw new Error('checkGasAndAirdrop() for network ', e)
  }
}

const hasEnoughGas = async ({ address }) => {
  try {
    const balance = await getEtherBalance({ address })
    console.log(balance)
    console.log(parseEther(MINIMUM_GAS_THRESHOLD))
    console.log(parseEther(MINIMUM_GAS_THRESHOLD).gt(balance))
    if (parseEther(MINIMUM_GAS_THRESHOLD).gt(balance)) return false
    return true
  } catch (e) {
    throw new Error('hasEnoughGas() ', e)
  }
}

const getEtherBalance = async ({ address }) => {
  return web3Provider.getBalance(address)
}

module.exports = { airdropGasTransaction }
