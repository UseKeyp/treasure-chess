import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'

import { logger } from 'src/lib/logger'
import { web3Provider } from 'src/lib/web3/helpers'
import { memberSendTransaction } from 'src/lib/web3/wallets'

export const getERC721Contract = (tokenAddress) => {
  try {
    return new Contract(
      tokenAddress,
      [
        'function ownerOf(uint256) external view returns (address)',
        'function safeTransferFrom(address, address, uint256) public virtual',
      ],
      web3Provider
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

// NOTE: If "to" refers to a smart contract, it must implement
// IERC721Receiver.onERC721Received, which is called upon a safe transfer.
export const transferERC721 = async ({
  tokenAddress,
  tokenId,
  toAddress,
  member,
}) => {
  let contract
  try {
    contract = getERC721Contract(tokenAddress)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to transfer ERC721', e.me)
  }

  try {
    const ownerAddress = await contract.ownerOf(tokenId)
    if (member.address.toLowerCase() !== ownerAddress.toLowerCase())
      throw new EnvelopError('You do not own this token')

    const unsignedTx = await contract.populateTransaction.safeTransferFrom(
      member.address,
      toAddress,
      tokenId
    )
    const tx = await memberSendTransaction({ memberId: member.id, unsignedTx })
    return { status: 'SUCCESS', hash: tx.hash }
  } catch (e) {
    logger.error(e)
    throw new EnvelopError(`Unable to transfer ERC721 - ${e.message}`)
  }
}

export const getERC721Balance = async ({ contractAddress, memberAddress }) => {
  let contract
  try {
    contract = getERC721Contract(contractAddress)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get ERC721 balance')
  }
  return await contract.balanceOf(memberAddress)
}

export const totalSupply = async () => {
  const contract = getERC721Contract()
  const supply = await contract.getTotalGames()
  return supply.toString()
}
