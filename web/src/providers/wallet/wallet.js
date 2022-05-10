import { useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useModal } from 'src/hooks/useModal'

import { WithdrawModal, DepositModal, AddressModal } from './modals'
import { MEMBER_BALANCE_QUERY, TRANSFER_ERC20 } from './graphql'
import { useMutation } from '@redwoodjs/web'
import { useToast } from 'src/providers/toast'

const WalletContext = React.createContext({
  balanceLoading: true,
  usdcBalance: null,
  mintCreditBalance: null,
  transferErc20: (tokenAddress, recipientAddress, amount) => {},
  transferErc20Loading: false,
  transferErc20Error: null,
})

const WalletProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [state, setState] = React.useState({
    usdcBalance: null,
    mintCreditBalance: null,
    addressToCopy: '',
    transferErc20Loading: false,
    transferErc20Error: null,
  })

  const { isVisible: isVisibleDep, toggleModal: toggleModalDep } = useModal()
  const { isVisible: isVisibleWit, toggleModal: toggleModalWit } = useModal()
  const { isVisible: isVisibleAdd, toggleModal: toggleModalAdd } = useModal()

  const [transferErc20Mutation] = useMutation(TRANSFER_ERC20)

  const {
    data: { memberBalance } = {},
    error: balanceError,
    loading: balanceLoading,
  } = useQuery(MEMBER_BALANCE_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })

  const getAddress = (address) => {
    // Set the correct address here before opening the modal
    // Necessary for "donating" to other users
    setState({ ...state, addressToCopy: address })
    toggleModalAdd()
  }

  const transferErc20 = async (tokenAddress, recipientAddress, amount) => {
    try {
      setState((state) => ({ ...state, transferErc20Loading: true }))

      const { error, data } = await transferErc20Mutation({
        variables: { tokenAddress, recipientAddress, amount },
      })
      if (error) throw error

      setState((state) => ({
        ...state,
        transferErc20Error: null,
        transferErc20Loading: false,
      }))

      return data
    } catch (e) {
      toast.error(e?.message)
      setState((state) => ({
        ...state,
        transferErc20Error: e?.message,
        transferErc20Loading: false,
      }))
      return null
    }
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
        deposit: toggleModalDep,
        withdraw: toggleModalWit,
        getAddress,
        transferErc20,
        usdcBalance: state.usdcBalance,
        mintCreditBalance: state.mintCreditBalance,
        balanceError,
        balanceLoading,
        transferErc20Loading: state.transferErc20Loading,
        transferErc20Error: state.transferErc20Error,
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
