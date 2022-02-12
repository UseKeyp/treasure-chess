import { useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useModal } from 'src/hooks/useModal'

import { WithdrawModal, DepositModal, AddressModal } from './modals'
import { WYRE_DEPOSIT_URL_QUERY, MEMBER_BALANCE_QUERY } from './graphql'

const WalletContext = React.createContext({
  balanceLoading: true,
  usdcBalance: null,
  mintCreditBalance: null,
})

const WalletProvider = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [state, setState] = React.useState({
    usdcBalance: null,
    mintCreditBalance: null,
  })

  const { isVisible: isVisibleDep, toggleModal: toggleModalDep } = useModal()
  const { isVisible: isVisibleWit, toggleModal: toggleModalWit } = useModal()
  const { isVisible: isVisibleAdd, toggleModal: toggleModalAdd } = useModal()

  const [wyreDepositUrlQuery] = useLazyQuery(WYRE_DEPOSIT_URL_QUERY)

  const onDeposit = async () => {
    const { data: { wyreDepositUrl } = {} } = await wyreDepositUrlQuery()
    window.open(
      wyreDepositUrl,
      'Treasure Chess - Deposit',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    toggleModalDep()
  }
  const onWithdraw = () => {
    toggleModalWit()
    // trigger wyre
  }

  const {
    data: { memberBalance } = {},
    error: balanceError,
    loading: balanceLoading,
  } = useQuery(MEMBER_BALANCE_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })

  React.useEffect(() => {
    setState({
      ...state,
      ...memberBalance,
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [memberBalance])

  return (
    <WalletContext.Provider
      value={{
        deposit: toggleModalDep,
        withdraw: toggleModalWit,
        getAddress: toggleModalAdd,
        usdcBalance: state.usdcBalance,
        mintCreditBalance: state.mintCreditBalance,
        balanceError,
        balanceLoading,
      }}
    >
      <DepositModal
        onSubmit={onDeposit}
        isVisible={isVisibleDep}
        toggleModal={toggleModalDep}
      />
      <WithdrawModal
        onSubmit={onWithdraw}
        isVisible={isVisibleWit}
        toggleModal={toggleModalWit}
      />
      <AddressModal
        address={currentUser?.address}
        isVisible={isVisibleAdd}
        toggleModal={toggleModalAdd}
      />
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => React.useContext(WalletContext)

export { WalletProvider, useWallet }
