import { totalSupply } from 'src/lib/web3/treasure'
import { getBusinessMetrics } from 'src/lib/metrics'
import { ForbiddenError } from '@redwoodjs/graphql-server'

export const chainData = async () => {
  let supply = ''
  try {
    const supply = await totalSupply()
  } catch (e) {
    logger.error(e)
  }
  return {
    treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
    marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
    totalSupply: supply,
    networkName: process.env.ETHEREUM_NETWORK_NAME,
    environment: process.env.ENVIRONMENT,
    nodeEnvironment: process.env.NODE_ENV,
  }
}

export const metrics = async ({ password }) => {
  if (password !== process.env.DATA_ACCESS_PASSWORD)
    throw new ForbiddenError("You don't have access to do that.")
  const metrics = await getBusinessMetrics()
  return metrics
}
