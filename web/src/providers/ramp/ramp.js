import { useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import { MEMBER_RAMPS_QUERY } from './graphql'

const WalletContext = React.createContext({
  coinbase: {},
  wyre: {},
})

const RampProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [state, setState] = React.useState({
    coinbase: { isConnected: false },
    wyre: { isConnected: false },
  })

  const {
    data: { memberBalance } = {},
    error: balanceError,
    loading: balanceLoading,
  } = useQuery(MEMBER_RAMPS_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })

  const [wyreDepositUrlQuery] = useLazyQuery(WYRE_DEPOSIT_URL_QUERY)
  const [oAuthUrlQuery] = useLazyQuery(OAUTH_URL_QUERY)

  const depositWyre = async () => {
    const { data: { wyreDepositUrl } = {} } = await wyreDepositUrlQuery()
    window.open(
      wyreDepositUrl,
      'Treasure Chess - Deposit',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    toggleModalDep()
  }

  const connectCoinbase = async () => {
    const { data: { oAuthUrl } = {} } = await oAuthUrlQuery({
      variables: { type: 'coinbase' },
    })
    window.open(
      oAuthUrl.url,
      'Coinbase - Connect',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    setCoinbaseDetails({ ...coinbaseDetails, isLoading: true })
  }

  const connectWyre = async () => {
    // const { data: { url } = {} } = await coinbaseLoginUrlQuery()
    // window.open(
    //   url,
    //   'Coinbase - Connect',
    //   'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    // )
    // setCoinbaseDetails({ ...coinbaseDetails, isLoading: true })
  }

  React.useEffect(() => {
    setState({
      ...state,
      ...memberBalance,
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [memberBalance])
  return (
    <RampContext.Provider
      value={{
        ...state,
        depositWyre,
        connectCoinbase,
        connectWyre,
      }}
    >
      {children}
    </RampContext.Provider>
  )
}

const useRamp = () => React.useContext(RampContext)

export { RampProvider, useRamp }
