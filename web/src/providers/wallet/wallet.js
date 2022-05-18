import { useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { useModal } from 'src/hooks/useModal'

import { WithdrawModal, DepositModal, AddressModal } from './modals'
import {
  MEMBER_BALANCE_QUERY,
  TRANSFER_ERC721_MUTATION,
  TRANSFER_ERC20_MUTATION,
} from './graphql'
import { useMutation } from '@redwoodjs/web'
import { useToast } from 'src/providers/toast'

const WalletContext = React.createContext({
  balanceLoading: true,
  usdcBalance: null,
  mintCreditBalance: null,
})

const WalletProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [state, setState] = React.useState({
    usdcBalance: null,
    mintCreditBalance: null,
    addressToCopy: '',
  })
  const [transferErc20Loading, setTransferErc20Loading] = React.useState(false)
  const [transferErc20Error, setTransferErc20Error] = React.useState()

  const [transferErc721Loading, setTransferErc721Loading] =
    React.useState(false)
  const [transferErc721Error, setTransferErc721Error] = React.useState()

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
  const [transferErc20Mutation] = useMutation(TRANSFER_ERC20_MUTATION)
  const [transferErc721Mutation] = useMutation(TRANSFER_ERC721_MUTATION)

  const getAddress = (address) => {
    // Set the correct address here before opening the modal
    // Necessary for "donating" to other users
    setState({ ...state, addressToCopy: address })
    toggleModalAdd()
  }

  const transferErc721 = async (args) => {
    try {
      setTransferErc721Loading(true)
      setTransferErc721Error(false)

      const { error, data } = await transferErc721Mutation({ variables: args })
      if (error) throw error
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferErc721Error(e?.message)
      setTransferErc721Loading(false)
    }
  }
  const transferErc20 = async (args) => {
    try {
      setTransferErc20Loading(true)
      setTransferErc20Error(false)

      const { error, data } = await transferErc20Mutation({ variables: args })
      if (error) throw error
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferErc20Error(e?.message)
      setTransferErc20Loading(false)
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
        usdcBalance: state.usdcBalance,
        mintCreditBalance: state.mintCreditBalance,
        balanceError,
        balanceLoading,
        transferErc721,
        transferErc721Error,
        transferErc721Loading,
        transferErc20,
        transferErc20Error,
        transferErc20Loading,
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
