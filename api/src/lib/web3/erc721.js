import {
  web3Provider,
  DEFAULT_GAS_MAX_FEE_PER_GAS,
  DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
} from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { EnvelopError } from '@envelop/core'
import { memberSendTransaction } from 'src/lib/web3/wallets'
import { logger } from 'src/lib/logger'

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

export const transferERC721 = async ({
  tokenAddress,
  recipientAddress,
  tokenId,
}) => {
  let contract
  try {
    contract = getERC721Contract(tokenAddress)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to transfer ERC721', e.me)
  }

  try {
    const address = await contract.ownerOf(tokenId)
    if (recipientAddress.toLowerCase() !== address.toLowerCase()) {
      throw new EnvelopError('Member does not own token')
    }

    const unsignedTx = await contract.populateTransaction.transfer(
      recipientAddress,
      tokenId,
      {
        maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
        maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
      }
    )
    const tx = await memberSendTransaction({
      memberId: context.currentUser.id,
      unsignedTx,
    })
    return { status: 'SUCCESS', hash: tx.hash }
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to transfer ERC721')
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
