const { getIdFromNetworkName } = require('@treasure-chess/web3-helpers')
import { getProviderByChainId } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import { EnvelopError } from '@envelop/core'

const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)

export const getUsdcBalance = async (address) => {
  if (!address) throw 'No address provided'
  let contract
  try {
    contract = new Contract(
      process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
      ['function balanceOf(address) external view returns (uint256)'],
      getProviderByChainId(CHAIN_ID)
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new EnvelopError('Unable to get USDC balance')
  }

  try {
    const bal = await contract.balanceOf(address)
    return formatUnits(bal, process.env.DECIMALS_PAYMENT_TOKEN)
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new EnvelopError('Unable to get USDC balance')
  }
}
