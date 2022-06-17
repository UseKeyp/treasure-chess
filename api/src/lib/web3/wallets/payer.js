import { Wallet } from '@ethersproject/wallet'

import { logger } from 'src/lib/logger'
import { web3Provider, getGasSettings } from 'src/lib/web3/helpers'

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

export const payerSendTransaction = async (unsigned) => {
  validateConfig(payerWallet)
  try {
    logger.debug({ custom: web3Provider.connection }, 'web3Provider')
    const payerWalletWithProvider = payerWallet.connect(web3Provider)
    const gasSettings = await getGasSettings()
    return await payerWalletWithProvider.sendTransaction({
      ...unsigned,
      ...gasSettings,
    })
  } catch (e) {
    logger.error(e)
    throw new Error(`payerSendTransaction() ${e}`)
  }
}

export const payerAddress = payerWallet.address
