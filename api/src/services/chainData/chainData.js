import { totalSupply } from 'src/lib/web3/treasure'

export const chainData = async () => {
  const supply = await totalSupply()

  return {
    treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
    marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
    totalSupply: supply,
    networkName: process.env.ETHEREUM_NETWORK_NAME,
    environment: process.env.ENVIRONMENT,
    nodeEnvironment: process.env.NODE_ENV,
  }
}
