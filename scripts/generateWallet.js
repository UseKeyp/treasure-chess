const { Wallet: EthersWallet } = require('@ethersproject/wallet')

// const wallet = EthersWallet.fromMnemonic(
//   process.env.APP_ADMIN_WALLET_MNEMONIC.replace(/,/g, ' ')
//   // process.env.PAYER_WALLET_MNEMONIC.replace(/,/g, ' ')
// )

const main = () => {
  const wallet = EthersWallet.createRandom()
  console.log('##### NEW WALLET #####')
  console.log('⚠️ Not secure. Do not use for real funds!\n')
  console.log(wallet.address)
  console.log(wallet.mnemonic.phrase.replace(/\s/g, ','))
  console.log(wallet.privateKey)
  console.log('\n###############')
}

export default main
