import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import {
  getProviderByChainId,
  getIdFromNetworkName,
} from 'src/lib/web3/helpers.js'
const contractAddress = process.env.CONTRACT_ADDRESS_TREASURE
import { EnvelopError } from '@envelop/core'

export const getUsdcBalance = async (address) => {
  let contract
  try {
    const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)
    const provider = getProviderByChainId(CHAIN_ID)
    contract = new Contract(
      contractAddress,
      ['function balanceOf(address) external view returns (uint256)'],
      provider
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new EnvelopError('Unable to get USDC balance')
  }

  try {
    const bal = await contract.balanceOf(address)
    return formatEther(bal).toString()
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new EnvelopError('Unable to get USDC balance')
  }
}
