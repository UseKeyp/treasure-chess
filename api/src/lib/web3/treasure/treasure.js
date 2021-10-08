import { getProviderByChainId } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import erc721Abi from './erc721Abi'

export const getERC721Contract = ({ contractAddress, chainId }) => {
  try {
    return new Contract(
      contractAddress,
      erc721Abi,
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
  const contract = new Contract(contractAddress, erc721Abi, rpcProvider)
  return await contract.balanceOf(userAddress)
}
