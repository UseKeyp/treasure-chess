const { Wallet: EthersWallet } = require('@ethersproject/wallet')

const main = () => {
  const wallet = EthersWallet.createRandom()
  console.log('##### NEW WALLET #####')
  console.log('⚠️ Not secure. Do not use for real funds!\n')
  console.log(wallet.address)
  console.log(wallet.mnemonic.phrase.replace(/\s/g, ','))
  console.log('\n###############')
}

export default main
