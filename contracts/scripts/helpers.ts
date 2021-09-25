import { ethers, upgrades } from 'hardhat'
import { Treasure, TreasureMarket, Treasure__factory } from '../typechain'

/**
 * Utilize OZ upgrades plugin to deploy, deployProxy does the following:
 * 1. Deploy the implementation contract
 * 2. Deploy the Proxy Admin contract
 * 3. Deploy the proxy contract and run any initializer function.
 * 	- You pass in the param args as an array.
 * @returns { treasureAddress, treasureMarketAddress }
 */
export const deployContracts = async () => {
  const Treasure = await ethers.getContractFactory('Treasure')
  const treasureInstance = await upgrades.deployProxy(Treasure)
  const treasureContract = (await treasureInstance.deployed()) as Treasure
  const treasureAddress = treasureContract.address
  console.log('Treasure deployed at: ', treasureAddress)

  const TreasureMarket = await ethers.getContractFactory('TreasureMarket')
  const treasureMarketInstance = await upgrades.deployProxy(TreasureMarket, [
    0,
    treasureAddress,
    process.env.FORWARDER_ADDRESS,
    25,
    100,
  ])
  const treasureMarketContract =
    (await treasureMarketInstance.deployed()) as TreasureMarket
  const treasureMarketAddress = treasureMarketContract.address
  console.log('Treasure Market deployed at: ', treasureMarketAddress)

  return {
    treasureContract,
    treasureMarketContract,
  }
}

/**
 * Utilize OZ upgrades plugin to upgrade, upgradeProxy does the following:
 * 1. Deploy the new implementation contract.
 * 2. Call the ProxyAdmin to update the proxy contract to use the new implementation.
 * @param treasureAddress 
 * @param treasureMarketAddress 
 */
export const upgradeContracts = async (
  treasureAddress: string,
  treasureMarketAddress: string
) => {
  const Treasure = await ethers.getContractFactory('TreasureUpgraded')
	console.log("Upgrading Treasure...")
	await upgrades.upgradeProxy(treasureAddress, Treasure);
	console.log("Treasure upgraded.")

	const TreasureMarket = await ethers.getContractFactory('TreasureMarketUpgraded')
	await upgrades.upgradeProxy(treasureMarketAddress, TreasureMarket)
	console.log("TreasureMarket upgraded.")
}
