import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'
const { getIdFromNetworkName } = require('@treasure-chess/web3-helpers')
import { parseUnits } from '@ethersproject/units'

const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)
export const DEFAULT_GAS_PRICE = parseUnits('80', 'gwei')

export const getProviderByChainId = (chainId) => {
  try {
    if (chainId == 100) return new JsonRpcProvider(process.env.XDAI_RPC)
    if (chainId == 137) return new JsonRpcProvider(process.env.MATIC_RPC)
    if (chainId == 80001) return new JsonRpcProvider(process.env.MUMBAI_RPC)
    if (chainId == 56) return new JsonRpcProvider(process.env.BSC_MAINNET_RPC)
    if (chainId == 97) return new JsonRpcProvider(process.env.BSC_TESTNET_RPC)
    return new InfuraProvider(Number(chainId), process.env.INFURA_ID)
  } catch (error) {
    throw new Error(error)
  }
}

export const web3Provider = getProviderByChainId(CHAIN_ID)
