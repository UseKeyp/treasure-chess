import Icon from 'src/components/Icon'

import { getBlockExplorerUrl } from 'src/utils/helpers'
import { FAILED } from 'src/providers/minting/constants'
export const MintingToast = ({ mintPurchase }) => {
  if (mintPurchase.status == FAILED)
    return (
      <div className="align-center items-center">
        <div>Mint failed for Treasure &quot;{mintPurchase.title}&quot;</div>
        <div className="mt-2">A credit has been refunded</div>
      </div>
    )
  return (
    <div className="flex align-center items-center">
      <div className="mr-2">Minting</div>
      <a
        href={getBlockExplorerUrl({ txHash: mintPurchase?.transaction?.id })}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="network" />
      </a>
    </div>
  )
}
