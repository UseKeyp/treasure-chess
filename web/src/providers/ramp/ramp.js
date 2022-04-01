import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useToast } from 'src/providers/toast'
import { TxToast } from 'src/providers/market/toasts'
import { useOAuth } from 'src/providers/oAuth'

import {
  MEMBER_RAMPS_QUERY,
  WYRE_DEPOSIT_URL_QUERY,
  RAMP_WITHDRAW_MUTATION,
} from './graphql'

const PLAID = 'PLAID'
const COINBASE = 'COINBASE'
const WYRE = 'WYRE'

const RampContext = React.createContext({
  isLoading: true,
})

const RampProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const { getOAuthUrl, submitCodeGrant, error: errorOAuth } = useOAuth()

  const [shouldPoll, setShouldPoll] = React.useState(true)
  const [coinbase, setCoinbase] = React.useState({
    isLoading: false,
    name: 'Coinbase',
    type: COINBASE,
  })
  const [wyre, setWyre] = React.useState({
    isLoading: false,
    type: WYRE,
    name: 'Wyre + Plaid',
  })

  const {
    data: { ramps } = {},
    error: rampError,
    loading: rampsLoading,
  } = useQuery(MEMBER_RAMPS_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated || !shouldPoll,
    fetchPolicy: 'network-only',
  })
  const updateRamps = () => {
    const coinbaseRamp = ramps.find((ramp) => ramp.type === COINBASE)
    const wyreRamp = ramps.find((ramp) => ramp.type === WYRE)
    // TODO:  only continue if there's been a change, otherwise keep polling.
    setCoinbase({
      ...coinbase,
      ...coinbaseRamp,
    })
    setWyre({
      ...wyre,
      ...wyreRamp,
    })
    setShouldPoll(false)
  }

  React.useEffect(() => {
    if (!ramps) return
    updateRamps()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ramps])

  const [wyreDepositUrlQuery] = useLazyQuery(WYRE_DEPOSIT_URL_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [rampWithdrawMutation] = useMutation(RAMP_WITHDRAW_MUTATION)

  const depositWyre = async () => {
    const { data: { wyreDepositUrl } = {} } = await wyreDepositUrlQuery()
    window.open(
      wyreDepositUrl,
      'Treasure Chess - Deposit',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    // TODO: Close the modal
    // toggleModalDep()
  }

  const connectCoinbase = async () => {
    setCoinbase({ isLoading: true, error: null, ...coinbase })
    const oAuthUrl = await getOAuthUrl(COINBASE)
    if (errorOAuth)
      return setWyre({ isLoading: false, error: errorOAuth, ...coinbase })
    setCoinbase({ isLoading: false, ...coinbase })
    setShouldPoll(true)
    window.open(
      oAuthUrl.url,
      'Coinbase - Connect',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
  }

  const connectWyre = async () => {
    setWyre({ isLoading: true, error: null, ...wyre })
    const oAuthUrl = await getOAuthUrl(PLAID)
    if (errorOAuth)
      return setWyre({ isLoading: false, error: errorOAuth, ...wyre })
    setWyre({ isLoading: false, ...wyre })
    /* eslint-disable-next-line no-undef */
    var linkHandler = Plaid.create({
      token: oAuthUrl.text,
      /* eslint-disable camelcase*/
      onSuccess: async (public_token, metadata) => {
        const accountId = metadata.accounts[0].id
        try {
          const { data } = await submitCodeGrant({
            code: public_token,
            accountId,
            type: PLAID,
          })
          if (errorOAuth)
            return setWyre({ isLoading: false, error: errorOAuth, ...wyre })
          const { ramp: wyreRamp } = data
          setWyre({
            ...wyre,
            isLoading: false,
            ...wyreRamp,
          })
          toast.success('Wyre + Plaid connected!')
        } catch (e) {
          setWyre({
            ...wyre,
            isLoading: false,
            error: e.message,
          })
        }
      },
      onExit: function (err, _metadata) {
        if (err != null) {
          // TODO: Trigger some error notification
          toast.error('Failed to connect')
          // The user encountered a Plaid API error prior to exiting.
        }
      },
    })
    linkHandler.open()
  }

  const withdrawCoinbase = async (amount) => {
    try {
      setCoinbase({ isLoading: true, error: null, ...coinbase })
      const {
        data: { rampWithdraw },
      } = await rampWithdrawMutation({
        variables: { type: COINBASE, amount },
      })
      toast.success(
        <TxToast text="Withdraw submitted" txHash={rampWithdraw.id} />,
        {
          id: rampWithdraw.id,
        }
      )
      setCoinbase({ isLoading: false, ...coinbase })
    } catch (e) {
      setCoinbase({ isLoading: false, error: e.message, ...coinbase })
    }
  }

  const withdrawWyre = async (amount) => {
    try {
      setWyre({ isLoading: true, error: null, ...wyre })
      const {
        data: { rampWithdraw },
      } = await rampWithdrawMutation({
        variables: { type: WYRE, amount },
      })
      toast.success(
        <TxToast text="Withdraw submitted" txHash={rampWithdraw.id} />,
        {
          id: rampWithdraw.id,
        }
      )
      setWyre({ isLoading: false, ...wyre })
    } catch (e) {
      setWyre({ isLoading: false, error: e.message, ...wyre })
    }
  }

  const isLoading = rampsLoading || coinbase.isLoading || wyre.isLoading

  return (
    <RampContext.Provider
      value={{
        isLoading,
        rampError, // Currently unused
        deposit: depositWyre,
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
