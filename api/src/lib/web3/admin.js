import { Wallet } from '@ethersproject/wallet'

const adminWallet = new Wallet(process.env.APP_ADMIN_WALLET_MNEMONIC)

export const adminSign = async (unsigned) =>
  adminWallet.signTransaction(unsigned)
