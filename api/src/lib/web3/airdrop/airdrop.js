import { Wallet } from '@ethersproject/wallet'
import { parseEther } from '@ethersproject/units'
import { web3Provider } from 'src/lib/web3/helpers'
import Sentry from 'src/lib/sentry'

const MINIMUM_GAS_THRESHOLD = '0.0075' // Units of Ether
const DEFAULT_DROP_AMOUNT = '0.025' // Units of Ether

const payerWallet = Wallet.fromMnemonic(
  process.env.PAYER_WALLET_MNEMONIC.replace(/,/g, ' ')
)

const validateConfig = (wallet) => {
  if (
    wallet.address.toLowerCase() !==
    process.env.PAYER_WALLET_ADDRESS.toLowerCase()
  )
    throw 'Payer wallet address and mnemonic do not match'
}

const airdropGasTransaction = async ({ address, amount }) => {
  try {
    const tx = {
      to: address,
      value: parseEther(amount),
    }
    validateConfig(payerWallet)
    const payerWalletWithProvider = await payerWallet.connect(web3Provider)
    return await payerWalletWithProvider.sendTransaction(tx)
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e?.message || e)
    Sentry.captureException(e)
    throw new Error('airdropGasTransaction() ', e?.message || e)
  }
}

const hasEnoughGas = async ({ address }) => {
  try {
    const balance = await getEtherBalance({ address })
    if (balance.lte(parseEther(MINIMUM_GAS_THRESHOLD))) return false
    return true
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('hasEnoughGas() ', e?.message || e)
  }
}

const getEtherBalance = async ({ address }) => {
  return web3Provider.getBalance(address)
}

const checkGasAndAirdrop = async ({
  address,
  amount = DEFAULT_DROP_AMOUNT,
}) => {
  try {
    const hasGas = await hasEnoughGas({ address })
    if (!hasGas) {
      const tx = await airdropGasTransaction({ address, amount })
      return tx
    }
    return null
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('checkGasAndAirdrop()', e.message || e)
  }
}

module.exports = { checkGasAndAirdrop }
