import { transferERC721 } from 'src/lib/web3/erc721'
import { EnvelopError } from '@envelop/core'

export const transfer = async ({
  tokenAddress,
  tokenId,
  recipientAddress,
  type,
}) => {
  const member = await fetchMember(recipientAddress)
  if (!member || member.country === 'ETHER')
    throw new EnvelopError(
      'External transfers are not enabled yet. Recipient must be a Treasure Chess member.'
    )
  if (type === 'ERC721')
    return transferERC721({ tokenAddress, recipientAddress, tokenId })
  throw new EnvelopError(`Transfer type "${type}" is not supported.`)
}
