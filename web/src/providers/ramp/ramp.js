import { useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import {
  MEMBER_RAMPS_QUERY,
  WYRE_DEPOSIT_URL_QUERY,
  OAUTH_URL_QUERY,
} from './graphql'

const RampContext = React.createContext({
  isLoading: true,
})

const RampProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [coinbase, setCoinbase] = React.useState({
    isLoading: false,
    isConnected: false,
    name: 'Coinbase',
  })
  const [wyre, setWyre] = React.useState({
    isLoading: false,
    isConnected: false,
    name: 'Wyre',
  })

  const {
    data: { memberRamps } = {},
    error: rampsError,
    loading: rampsLoading,
  } = useQuery(MEMBER_RAMPS_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })

  const updateRamps = () => {
    setCoinbase({
      ...coinbase,
      isConnected: memberRamps.coinbaseWithdrawAddress && true,
      address: memberRamps.coinbaseWithdrawAddress,
    })
    setWyre({
      ...wyre,
      isConnected: memberRamps.wyreWithdrawAddress && true,
      address: memberRamps.wyreWithdrawAddress,
    })
  }

  React.useEffect(() => {
    if (!memberRamps) return
    updateRamps()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [memberRamps])

  const [wyreDepositUrlQuery] = useLazyQuery(WYRE_DEPOSIT_URL_QUERY)
  const [oAuthUrlQuery] = useLazyQuery(OAUTH_URL_QUERY)

  const depositWyre = async () => {
    setWyre({ isLoading: true, ...wyre })
    const { data: { wyreDepositUrl } = {} } = await wyreDepositUrlQuery()
    setWyre({ isLoading: false, ...wyre })
    window.open(
      wyreDepositUrl,
      'Treasure Chess - Deposit',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    toggleModalDep()
  }

  const connectCoinbase = async () => {
    setCoinbase({ isLoading: true, ...coinbase })
    const { data: { oAuthUrl } = {} } = await oAuthUrlQuery({
      variables: { type: 'coinbase' },
    })
    setCoinbase({ isLoading: false, ...coinbase })
    window.open(
      oAuthUrl.url,
      'Coinbase - Connect',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    setCoinbase({ ...coinbaseDetails, isLoading: true })
  }

  const connectWyre = async () => {
    setWyre({ isLoading: true, ...wyre })
    // const { data: { url } = {} } = await coinbaseLoginUrlQuery()
    setWyre({ isLoading: false, ...wyre })
    // window.open(
    //   url,
    //   'Coinbase - Connect',
    //   'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    // )
    // setCoinbase({ ...coinbaseDetails, isLoading: true })
  }

  const withdrawCoinbase = async (amount) => {
    setCoinbase({ isLoading: true, ...coinbase })
    console.log('withdraw from Coinbase ', amount)
    setCoinbase({ isLoading: false, ...coinbase })
  }
  const withdrawWyre = async (amount) => {
    setWyre({ isLoading: true, ...wyre })
    console.log('withdraw from Wyre ', amount)
    setWyre({ isLoading: false, ...wyre })
  }

  const isLoading = rampsLoading || coinbase.isLoading || wyre.isLoading

  return (
    <RampContext.Provider
      value={{
        isLoading,
        ramps: [
          {
            ...coinbase,
            onConnect: connectCoinbase,
            onWithdraw: withdrawCoinbase,
          },
          {
            ...wyre,
            onConnect: connectWyre,
            onWithdraw: withdrawWyre,
            onDeposit: depositWyre,
          },
        ],
      }}
    >
      {children}
    </RampContext.Provider>
  )
}

const useRamp = () => React.useContext(RampContext)

export { RampProvider, useRamp }
