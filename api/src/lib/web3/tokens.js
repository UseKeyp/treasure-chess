import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import {
  getProviderByChainId,
  getIdFromNetworkName,
} from 'src/lib/web3/helpers.js'
const contractAddress = process.env.CONTRACT_ADDRESS_TREASURE //'0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1' //mumbai contract

export const getUsdcBal = async () => {
  try {
    CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)
    provider = getProviderByChainId(CHAIN_ID)
    contract = new Contract(
      contractAddress,
      ['function balanceOf(address) external view returns (uint256)'],
      provider
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    return 'Unable to fetch balance'
  }

  try {
    bal = await contract.balanceOf(context.currentUser.address)
    return JSON.stringify(formatEther(bal).toString())
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    return 'Unable to fetch balance'
  }
}

export const usdcBalanceGetter = async () => {
  const usdcBalance = await getUsdcBal()
  return usdcBalance
}
