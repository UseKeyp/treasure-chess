import Icon from 'src/components/Icon'

import { getBlockExplorerUrl } from 'src/utils/helpers'

export const TxToast = ({ txHash, text }) => (
  <div className="flex align-center">
    <div className="mr-2">{text}</div>
    <a href={getBlockExplorerUrl({ txHash })} target="_blank" rel="noreferrer">
      <Icon name="network" />
    </a>
  </div>
)
