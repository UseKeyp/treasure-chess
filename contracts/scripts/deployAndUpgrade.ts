import { deployContracts, upgradeContracts } from './helpers'

async function main() {
  const { treasureAddress, treasureMarketAddress } = await deployContracts()
  await upgradeContracts(treasureAddress, treasureMarketAddress)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
