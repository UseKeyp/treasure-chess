import { AddressModal } from './modals'
import { WithdrawModal } from 'src/providers/ramp/ramp'

export const address = () => (
  <AddressModal
    address={'0xabb123'}
    onSubmit={() => {}}
    isVisible={true}
    toggleModal={() => {}}
  />
)

// const wyreDetails = { name: 'Wyre', isConnected: false }
// const coinbaseDetails = { name: 'Coinbase', isConnected: false }

export const withdraw = () => (
  <WithdrawModal onSubmit={() => {}} isVisible={true} toggleModal={() => {}} />
)

export const withdrawLoading = () => (
  <WithdrawModal onSubmit={() => {}} isVisible={true} toggleModal={() => {}} />
)

export const withdrawConnected = () => (
  <WithdrawModal onSubmit={() => {}} isVisible={true} toggleModal={() => {}} />
)

export default { title: 'Modals/WalletModals' }
