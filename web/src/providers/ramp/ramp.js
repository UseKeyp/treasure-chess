import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

import { useToast } from 'src/providers/toast'
import { TxToast } from 'src/providers/market/toasts'
import { useOAuth } from 'src/providers/oAuth'

import {
  MEMBER_RAMPS_QUERY,
  RAMP_WITHDRAW_MUTATION,
  WYRE_DEPOSIT_URL_QUERY,
} from './graphql'
import Icon from 'src/components/Icon'
import LoadingDots from 'src/components/LoadingDots'
import Button from 'src/components/Button'
import { trimAddress } from 'src/utils/helpers'
import { useModal } from 'src/hooks/useModal'
import { DepositModal, WithdrawModal } from 'src/providers/ramp/modals'

const PLAID = 'PLAID'
const COINBASE = 'COINBASE'
const WYRE = 'WYRE'

const RampContext = React.createContext({
  isLoading: true,
})

const useRamp = () => React.useContext(RampContext)

export const VendorConnection = ({ ramp, amount, isLoading, disabled }) => {
  if (!ramp) return null
  let backgroundColor = isLoading
    ? 'bg-chessBlack-200 pointer-events-none'
    : 'bg-green'
  const loadingText = (
    <p className="text-white flex justify-center text-[10px]">
      <LoadingDots />
    </p>
  )
  const buttonClassName = `mt-4 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
  let rampError
  if (ramp.error != null && ramp.error != '') {
    rampError = ramp.error.substring(0, 200)
  } else {
    rampError = ''
  }

  let button = (
    <Button
      id="connection-button"
      className={buttonClassName}
      onClick={ramp.onConnect}
      disabled={isLoading}
    >
      {ramp.isLoading ? loadingText : 'Connect  '}
    </Button>
  )
  if (ramp.address)
    button = (
      <Button
        className={buttonClassName}
        disabled={isLoading}
        onClick={() => ramp.onWithdraw(amount)}
      >
        {ramp.isLoading ? loadingText : 'Withdraw'}
      </Button>
    )
  if (disabled) button = <h3 className="mt-4">(Coming soon)</h3>

  let status
  if (ramp.address)
    status = (
      <div className="flex align-center">
        <div>
          <h4>
            <i>Connected to {trimAddress(ramp.address)}</i>
          </h4>
          <h4>
            <i>{ramp.accountNickname}</i>
          </h4>
        </div>
        <div className="flex ml-4 align-center">
          <Button onClick={ramp.onConnect} disabled={isLoading}>
            <div className="flex flex-row items-center">
              <Icon name="circle_arrow" height="13" color="white" />
              <p className="ml-2">Update</p>
            </div>
          </Button>
        </div>
      </div>
    )
  const icon =
    ramp.type === 'COINBASE' ? (
      <Icon
        name="coinbase"
        size="25"
        height="25"
        color="white"
        className=" mb-2"
      />
    ) : (
      <img
        src="/icons/wyre_plaid.png"
        alt="Wyre and Plaid logos"
        className="h-12"
      />
    )
  return (
    <div
      className={`align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-2 ${
        ramp.address ? 'border-green' : 'border-chessBlack-100'
      }`}
    >
      <div className=" flex align-center items-center">{icon}</div>
      <h2 className="mt-2">{status}</h2>
      {button}
      <div className="mt-8 font-bold text-errorYellow">{rampError}</div>
    </div>
  )
}

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

  const { isVisible: isVisibleDep, toggleModal: toggleModalDep } = useModal()
  const { isVisible: isVisibleWit, toggleModal: toggleModalWit } = useModal()

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
    const handleClickInsideModal = () => {
      setCoinbase({
        error: '',
        ...coinbase,
        ...coinbaseRamp,
      })
      setWyre({
        error: '',
        ...wyre,
        ...wyreRamp,
      })
    }
    document.addEventListener('click', handleClickInsideModal, true)
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
    if (isBrowser)
      window.open(
        wyreDepositUrl,
        'Treasure Chess - Deposit',
        'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
      )
    // TODO: Close the modal
    // toggleModalDep()
  }

  const connectCoinbase = async () => {
    document.getElementById('connection-button').disabled = true
    setCoinbase({ isLoading: true, error: '', ...coinbase })
    try {
      const oAuthUrl = await getOAuthUrl(COINBASE)
      if (oAuthUrl == null || oAuthUrl == '') {
        coinbase.error = errorOAuth
        setCoinbase({ isLoading: false, ...coinbase })
        document.getElementById('connection-button').disabled = false
        return
      }
      if (isBrowser)
        window.open(
          oAuthUrl.url,
          'Coinbase - Connect',
          'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
        )
      setShouldPoll(true)
      document.getElementById('connection-button').disabled = false
    } catch (error) {
      coinbase.error = error
      document.getElementById('connection-button').disabled = false
      return setCoinbase({ isLoading: false, error: error, ...coinbase })
    }
  }

  const connectWyre = async () => {
    document.getElementById('connection-button').disabled = true
    setWyre({ isLoading: true, error: null, ...wyre })
    let oAuthUrl
    try {
      oAuthUrl = await getOAuthUrl(PLAID)
      setShouldPoll(true)
      if (oAuthUrl == null || oAuthUrl == '') {
        wyre.error = errorOAuth
        document.getElementById('connection-button').disabled = false
        return setWyre({ isLoading: false, error: errorOAuth, ...wyre })
      }
    } catch (error) {
      wyre.error = error
      document.getElementById('connection-button').disabled = false
      return setWyre({ isLoading: false, error: error, ...wyre })
    }
    /* eslint-disable-next-line no-undef */
    const linkHandler = Plaid.create({
      token: oAuthUrl.text,
      /* eslint-disable camelcase*/
      onSuccess: async (public_token, metadata) => {
        const accountId = metadata.accounts[0].id
        try {
          const { data, error } = await submitCodeGrant({
            code: public_token,
            accountId,
            type: PLAID,
          })
          if (error) throw error
          const { ramp: wyreRamp } = data
          setWyre({
            ...wyre,
            isLoading: false,
            ...wyreRamp,
          })
          toast.success('Wyre + Plaid connected!')
        } catch (e) {
          document.getElementById('connection-button').disabled = false
          setWyre({
            ...wyre,
            isLoading: false,
            error: e.message,
          })
        }
      },
      onExit: function (err, _metadata) {
        document.getElementById('connection-button').disabled = false
        if (err != null) {
          // TODO: Trigger some error notification
          // The user encountered a Plaid API error prior to exiting.
          wyre.error = err
          setWyre({
            ...wyre,
            isLoading: false,
            error: err,
          })
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
        // deposit: toggleModalDep,
        withdraw: toggleModalWit,
        ramps: [
          {
            ...wyre,
            onConnect: connectWyre,
            onWithdraw: withdrawWyre,
            onDeposit: depositWyre,
          },
          // Disabled
          {
            ...coinbase,
            onConnect: connectCoinbase,
            onWithdraw: withdrawCoinbase,
          },
        ],
      }}
    >
      <DepositModal isVisible={isVisibleDep} toggleModal={toggleModalDep} />
      <WithdrawModal isVisible={isVisibleWit} toggleModal={toggleModalWit} />
      {children}
    </RampContext.Provider>
  )
}

export { RampProvider, useRamp }
