import { WithdrawModal, DepositModal, AddressModal } from './modals'

export const deposit = () => (
  <DepositModal onSubmit={() => {}} isVisible={true} toggleModal={() => {}} />
)
export const withdraw = () => (
  <WithdrawModal onSubmit={() => {}} isVisible={true} toggleModal={() => {}} />
)

export const address = () => (
  <AddressModal
    address={'0xabb123'}
    onSubmit={() => {}}
    isVisible={true}
    toggleModal={() => {}}
  />
)

export default { title: 'Modals/WalletModals' }
