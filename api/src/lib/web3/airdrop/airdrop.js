import { Wallet } from '@ethersproject/wallet'
import { parseEther, formatEther } from '@ethersproject/units'
import { web3Provider } from 'src/lib/web3/helpers'
import { sendDiscordAlert } from 'src/lib/discord/discord'
import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import {
  DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
  DEFAULT_GAS_MAX_FEE_PER_GAS,
} from 'src/lib/web3/helpers'

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
      maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
      maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
    }
    validateConfig(payerWallet)
    const payerWalletWithProvider = await payerWallet.connect(web3Provider)
    return await payerWalletWithProvider.sendTransaction(tx)
  } catch (e) {
    logger.error(e?.message || e)
    Sentry.captureException(e)
    throw new Error('airdropGasTransaction() ', e?.message || e)
  }
}

const getEtherBalance = async ({ address }) => {
  return web3Provider.getBalance(address)
}

const checkGasAndAirdrop = async ({ member, amount = DEFAULT_DROP_AMOUNT }) => {
  try {
    const balance = await getEtherBalance({ address: member.address })
    const payerBalance = await getEtherBalance({ address: payerWallet.address })
    if (balance.lte(parseEther(MINIMUM_GAS_THRESHOLD))) {
      const tx = await airdropGasTransaction({
        address: member.address,
        amount,
      })
      await notifyDiscord({
        member,
        txHash: tx.hash,
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        payerBalance: formatEther(payerBalance),
      })
      return tx
    }
    return null
  } catch (e) {
    logger.error(e)
    throw new Error('checkGasAndAirdrop()', e.message || e)
  }
}

const notifyDiscord = async ({
  member,
  txHash,
  payerBalance,
  gasPrice,
  gasLimit,
}) => {
  try {
    await sendDiscordAlert({
      embed: {
        color: 16740982,
        title: `✅  Airdrop Submitted!`,
        description: `Username: ${member.username}
Address: ${member.address}
Gas Price: ${gasPrice}
Gas Limit: ${gasLimit}
${getExplorerBaseUrlFromName(process.env.ETHEREUM_NETWORK_NAME)}tx/${txHash}

Payer balance: **${payerBalance}**`,
        footer: { text: new Date().toString() },
      },
      channelName: 'airdrop',
    })
  } catch (e) {
    logger.error(e)
  }
}

module.exports = { checkGasAndAirdrop }
