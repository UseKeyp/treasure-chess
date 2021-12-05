import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { getProviderByChainId } from 'src/lib/web3/helpers.js'
const CHAIN_ID = 80001 //getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)
const contractAddress = '0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1'

export const getUsdcBal = async () => {
  provider = getProviderByChainId(CHAIN_ID)
  try {
    contract = new Contract(
      contractAddress, //process.env.CONTRACT_ADDRESS_TREASURE,
      ['function balanceOf(address) external view returns (uint256)'],
      provider
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(e)
  }

  try {
    bal = await contract.balanceOf(context.currentUser.address)
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(e)
  }
  //bal = BigNumber.toNumber(bal).toString()
  return JSON.stringify(formatEther(bal).toString())
}

export const usdcBalanceGetter = async () => {
  //return context.currentUser.address
  const usdcBalance = await getUsdcBal()

  return usdcBalance //JSON.stringify(usdcBalance)
}
