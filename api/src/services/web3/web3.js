import { EnvelopError } from '@envelop/core'

import { transferERC721 } from 'src/lib/web3/erc721'
import { fetchMember } from 'src/lib/members'
import { logger } from 'src/lib/logger'

const validateTransfer = async ({ toAddress }) => {
  const member = await fetchMember(toAddress)
  logger.debug({ custom: member }, `transfer to ${toAddress}`)
  if (!member || member.country === 'ETHER')
    throw new EnvelopError(
      'External transfers are not enabled yet. Recipient must be a Treasure Chess member.'
    )
}

export const transferErc20 = async ({ _tokenAddress, _amount, toAddress }) => {
  await validateTransfer({ toAddress })
  throw new EnvelopError(`Transfer type "ERC20" is not yet supported.`)
}
export const transferErc721 = async ({ tokenAddress, tokenId, toAddress }) => {
  await validateTransfer({ toAddress })
  return transferERC721({
    tokenAddress,
    tokenId,
    toAddress,
    member: context.currentUser,
  })
}
