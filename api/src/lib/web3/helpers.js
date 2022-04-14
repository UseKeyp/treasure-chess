import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'
const { getIdFromNetworkName } = require('@treasure-chess/web3-helpers')
import { parseUnits } from '@ethersproject/units'
import fetch from 'cross-fetch'
import { logger } from 'src/lib/logger'

import { isProduction } from 'src/lib/helpers'
const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)
export const DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS = parseUnits('2', 'gwei')
export const DEFAULT_GAS_MAX_FEE_PER_GAS = parseUnits('10', 'gwei')

export const getProviderByChainId = (chainId) => {
  try {
    if (chainId == 100) return new JsonRpcProvider(process.env.XDAI_RPC)
    if (chainId == 137) return new JsonRpcProvider(process.env.MATIC_RPC)
    if (chainId == 80001) return new JsonRpcProvider(process.env.MUMBAI_RPC)
    if (chainId == 56) return new JsonRpcProvider(process.env.BSC_MAINNET_RPC)
    if (chainId == 97) return new JsonRpcProvider(process.env.BSC_TESTNET_RPC)
    if (chainId == 3) return new JsonRpcProvider(process.env.ROPSTEN_RPC)
    return new InfuraProvider(Number(chainId), process.env.INFURA_ID)
  } catch (error) {
    throw new Error(error)
  }
}

export const web3Provider = getProviderByChainId(CHAIN_ID)

export const getGasSettings = async () => {
  let maxFeePerGas = parseUnits('40', 'gwei') // fallback to 40 gwei
  let maxPriorityFeePerGas = parseUnits('40', 'gwei') // fallback to 40 gwei
  try {
    const res = await fetch(
      isProduction
        ? 'https://gasstation-mainnet.matic.network/v2'
        : 'https://gasstation-mumbai.matic.today/v2'
    ).then((res) => {
      return res.json()
    })
    // logger.debug({ custom: res }, 'gasstation response')
    maxFeePerGas = parseUnits(Math.ceil(res.fast.maxFee) + '', 'gwei')
    maxPriorityFeePerGas = parseUnits(
      Math.ceil(res.fast.maxPriorityFee) + '',
      'gwei'
    )
  } catch (e) {
    // ignore
    logger.error(e)
  }
  return { maxFeePerGas, maxPriorityFeePerGas }
}
