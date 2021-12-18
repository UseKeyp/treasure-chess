const { getIdFromNetworkName } = require('@treasure-chess/web3-helpers')
import { getProviderByChainId } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { EnvelopError } from '@envelop/core'

const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)

export const getUsdcBalance = async (address) => {
  if (!address) throw 'No address provided'
  let contract
  try {
    contract = new Contract(
      process.env.CONTRACT_ADDRESS_USDC,
      ['function balanceOf(address) external view returns (uint256)'],
      getProviderByChainId(CHAIN_ID)
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    // console.log(e)
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
