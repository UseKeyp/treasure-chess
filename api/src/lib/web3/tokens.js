import { web3Provider } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import { EnvelopError } from '@envelop/core'

export const getTokenContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
      [
        'function balanceOf(address) external view returns (uint256)',
        'function allowance(address, address) external view returns (uint256)',
        'function approve(address, uint256) external returns (bool)',
      ],
      web3Provider
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(e)
  }
}

export const getUsdcBalance = async (address) => {
  if (!address) throw 'No address provided'
  let contract
  try {
    contract = getTokenContract()
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
