import Icon from 'src/components/Icon'

import { getBlockExplorerUrl } from 'src/utils/helpers'

export const MintingToast = ({ mintPurchase }) => (
  <div className="flex align-center">
    <div className="mr-2">Minting</div>
    <a
      href={getBlockExplorerUrl({ txHash: mintPurchase?.txHash })}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="network" />
    </a>
  </div>
)
