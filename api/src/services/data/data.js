import { getBusinessMetrics, getChainData } from 'src/lib/metrics'
import { ForbiddenError } from '@redwoodjs/graphql-server'

export const chainData = () => getChainData()

export const metrics = async ({ password }) => {
  if (password !== process.env.DATA_ACCESS_PASSWORD)
    throw new ForbiddenError("You don't have access to do that.")
  const metrics = await getBusinessMetrics()
  return metrics
}
