import { deployContracts, upgradeContracts } from './helpers'

async function main() {
  const { treasureContract, treasureMarketContract } = await deployContracts()
  await upgradeContracts(treasureContract.address, treasureMarketContract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
