import { useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useModal } from 'src/hooks/useModal'

import { WithdrawModal, DepositModal, AddressModal } from './modals'
import { MEMBER_BALANCE_QUERY, TRANSFER_MUTATION } from './graphql'
import { useMutation } from '@redwoodjs/web'
import { useToast } from 'src/providers/toast'

const WalletContext = React.createContext({
  balanceLoading: true,
  usdcBalance: null,
  mintCreditBalance: null,
})

const WalletProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [state, setState] = React.useState({
    usdcBalance: null,
    mintCreditBalance: null,
    addressToCopy: '',
  })
  const { toast } = useToast()
  const [transferLoading, setTransferLoading] = React.useState(false)

  const { isVisible: isVisibleDep, toggleModal: toggleModalDep } = useModal()
  const { isVisible: isVisibleWit, toggleModal: toggleModalWit } = useModal()
  const { isVisible: isVisibleAdd, toggleModal: toggleModalAdd } = useModal()

  const {
    data: { memberBalance } = {},
    error: balanceError,
    loading: balanceLoading,
  } = useQuery(MEMBER_BALANCE_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })
  const [transferMutation] = useMutation(TRANSFER_MUTATION)

  const transfer = async (value) => {
    try {
      setTransferLoading(true)
      await transferMutation(value)
    } catch (e) {
      toast.error(e?.message)
    } finally {
      setTransferLoading(false)
    }
  }

  const getAddress = (address) => {
    // Set the correct address here before opening the modal
    // Necessary for "donating" to other users
    setState({ ...state, addressToCopy: address })
    toggleModalAdd()
  }

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
        transfer: transfer,
        deposit: toggleModalDep,
        withdraw: toggleModalWit,
        getAddress,
        usdcBalance: state.usdcBalance,
        mintCreditBalance: state.mintCreditBalance,
        balanceError,
        balanceLoading,
        transferLoading,
      }}
    >
      <DepositModal isVisible={isVisibleDep} toggleModal={toggleModalDep} />
      <WithdrawModal isVisible={isVisibleWit} toggleModal={toggleModalWit} />
      <AddressModal
        address={state.addressToCopy}
        isVisible={isVisibleAdd}
        toggleModal={toggleModalAdd}
      />
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => React.useContext(WalletContext)

export { WalletProvider, useWallet }
