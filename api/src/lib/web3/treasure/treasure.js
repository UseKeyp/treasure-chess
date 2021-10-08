import { getProviderByChainId } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import treasureAbi from './treasureAbi'

export const getTreasureContract = ({ contractAddress, chainId }) => {
  try {
    return new Contract(
      contractAddress,
      treasureAbi,
      getProviderByChainId(chainId)
    )
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export const getERC721Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, treasureAbi, rpcProvider)
  return await contract.balanceOf(userAddress)
}
