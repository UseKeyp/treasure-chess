import { parseEther, formatEther } from '@ethersproject/units'
import { web3Provider } from 'src/lib/web3/helpers'
import { sendDiscordAlert } from 'src/lib/discord/discord'
import { payerSendTransaction } from 'src/lib/web3/wallets'
import { payerAddress } from 'src/lib/web3/wallets/payer'

import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

const MINIMUM_GAS_THRESHOLD = '0.0075' // Units of Ether
const DEFAULT_DROP_AMOUNT = '0.025' // Units of Ether

const airdropGasTransaction = async ({ address, amount }) => {
  try {
    const tx = {
      to: address,
      value: parseEther(amount),
    }
    return await payerSendTransaction(tx)
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
    const payerBalance = await getEtherBalance({ address: payerAddress })
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
