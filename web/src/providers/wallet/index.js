import { useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

const MEMBER_BALANCE = gql`
  query FindMemberBalanceQuery {
    memberBalance {
      usdcBalance
      mintCreditBalance
    }
  }
`

const WalletContext = React.createContext({
  loading: true,
  usdcBalance: null,
  mintCreditBalance: null,
})

const WalletProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [state, setState] = React.useState({
    usdcBalance: null,
    mintCreditBalance: null,
  })

  const {
    data: { memberBalance } = {},
    error: balanceError,
    loading: balanceLoading,
  } = useQuery(MEMBER_BALANCE, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })
  React.useEffect(() => {
    setState({
      ...state,
      ...memberBalance,
    })
  }, [memberBalance])

  const addFunds = async () => {
    // Open deposit modal
  }
  const withdrawFunds = async () => {
    // Open withdraw modal
  }

  return (
    <WalletContext.Provider
      value={{
        addFunds,
        withdrawFunds,
        usdcBalance: state.usdcBalance,
        mintCreditBalance: state.mintCreditBalance,
        balanceError,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => React.useContext(WalletContext)

export { WalletProvider, useWallet }
