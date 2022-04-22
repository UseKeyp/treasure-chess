import { transferERC721 } from 'src/lib/web3/erc721'

export const transfer = async ({
  tokenAddress,
  tokenId,
  recipientAddress,
  type,
}) => {
  if (type === 'ERC721') {
    return transferERC721({ tokenAddress, recipientAddress, tokenId })
  }
}
