import { Wallet } from '@ethersproject/wallet'

const adminWallet = new Wallet(process.env.APP_ADMIN_WALLET_MNEMONIC)

export const adminSign = async ({ _transaction }) => {
  const adminPublicAddress = await adminWallet.getAddress()

  // console.log(adminPublicAddress)
  // TODO: Sign transaction
  return adminPublicAddress
}
