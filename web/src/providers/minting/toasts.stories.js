import { FAILED, SUCCESS } from 'src/providers/minting/constants'

import { MintingToast } from './toasts'

const mintPurchase = {
  transaction: {
    id: '0xaa07b44c422c5e8666a551dd3b3b304487de52224c282ad55156fab95616e1e5',
  },
  status: SUCCESS,
  title: 'My best game',
}
export const failed = () => {
  return <MintingToast mintPurchase={{ ...mintPurchase, status: FAILED }} />
}
export const minting = () => {
  return <MintingToast mintPurchase={mintPurchase} />
}

export default { title: 'Toasts/MintingToast' }
