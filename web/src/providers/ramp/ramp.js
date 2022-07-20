import { useMutation, useQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { routes, Link } from '@redwoodjs/router'
import popupLoadingHtml from 'src/utils/popupLoadingHtml'
import Icon from 'src/components/Icon/Icon'

import { useToast } from 'src/providers/toast'
import { TxToast } from 'src/providers/market/toasts'
import { useOAuth } from 'src/providers/oAuth'

import {
  MEMBER_RAMPS_QUERY,
  RAMP_WITHDRAW_MUTATION,
  RAMP_URL_MUTATION,
} from './graphql'

const EXTERNAL_TRANSFER = 'EXTERNAL_TRANSFER'
const PLAID = 'PLAID'
const COINBASE = 'COINBASE'
const WYRE = 'WYRE'
const PELERIN = 'PELERIN'

const RampContext = React.createContext({
  isLoading: true,
})

const useRamp = () => React.useContext(RampContext)

const RampProvider = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const { toast } = useToast()
  const { getOAuthUrl, submitCodeGrant, error: errorOAuth } = useOAuth()

  const [state, setState] = React.useState({
    isLoading: false,
    error: null,
  })
  const [shouldPoll, setShouldPoll] = React.useState(true)
  const [coinbase, setCoinbase] = React.useState({
    isLoading: true,
    name: 'Coinbase',
    type: COINBASE,
  })
  const [pelerin, _setPelerin] = React.useState({
    // isLoading: true,
    name: 'Mt. Pelerin',
    icon: <Icon name="mt_pelerin" />,
    disabled: true,
    type: PELERIN,
    description: (
      <>
        <p>
          Regions: Most places excluding the US (
          <a
            href="https://developers.mtpelerin.com/service-information/supported-countries"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            list
          </a>
          )
          <br />
          Fee: Free up to $499, then 1.3% (
          <a
            href="https://www.mtpelerin.com/pricing"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            details
          </a>
          )
        </p>
      </>
    ),
  })
  const [wyre, setWyre] = React.useState({
    isLoading: true,
    type: WYRE,
    name: 'Wyre + Plaid',
    icon: (
      <img
        src="/icons/wyre_plaid.png"
        alt="Wyre and Plaid logos"
        className="h-[38px]"
        height="38px"
      />
    ),
    description: (
      <>
        <p>
          Regions: US, MX, AU, EU, CN, BR
          <br />
          Fee: 0.2%
        </p>
      </>
    ),
  })
  const externalTransfer = {
    name: 'Web3 Wallet',
    isLoading: false,
    type: EXTERNAL_TRANSFER,
    icon: (
      <div className="flex py-1 justify-center flex-row items-center">
        <div className="w-6 h-6 m-4 min-w-6 min-h-6">
          <Icon name="metamask" className="w-6 h-6 m-4" />
        </div>
        <img
          alt="rainbow"
          src="/rainbow_wallet.png"
          width="32px"
          className="ml-2"
        />
        <h2 className="ml-2">{t('Web3 wallet')}</h2>
      </div>
    ),
    description: (
      <>
        <p>
          Regions: All
          <br />
          Fee: none
        </p>
      </>
    ),
    disabled: !currentUser?.betaAccess,
    helperText: (
      <p className="italic">
        <Trans i18nkey="web:requestBetaAccess">
          <b>Beta feature</b>. Request to be a Beta Tester in{' '}
          <Link className="underline" to={routes.settings()}>
            Settings
          </Link>
          .
        </Trans>
      </p>
    ),
  }

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
    setCoinbase({
      ...coinbase,
      ...coinbaseRamp,
      isLoading: false,
    })
    setWyre({
      ...wyre,
      ...wyreRamp,
      isLoading: false,
    })
    setShouldPoll(false)
  }

  const [rampUrlMutation] = useMutation(RAMP_URL_MUTATION, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  })

  const [rampWithdrawMutation] = useMutation(RAMP_WITHDRAW_MUTATION)

  const getRampUrl = async ({ type, direction }) => {
    let myWindow
    try {
      myWindow = window.open(
        '',
        '_blank',
        'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
      )
      myWindow.document.write(popupLoadingHtml)
      setState({ ...state, isLoading: type, rampError: '' })
      const { data, error } = await rampUrlMutation({
        variables: { direction, type },
      })
      if (error) throw error
      const {
        getRampUrl: { url },
      } = data
      if (isBrowser && url) {
        myWindow.location = url
        setState({ ...state, isLoading: false, rampError: '' })
      }
    } catch (e) {
      setState({ ...state, isLoading: false, rampError: e })
      myWindow.document.write(
        `<h3>Oops! An error occured<br/><br/>Sending you back...</h3><p>${e}</p>`
      )
      setTimeout(() => {
        myWindow.close()
      }, 3000)
    }
  }

  const connectWyre = async () => {
    document.getElementById('connection-button').disabled = true
    setWyre({ isLoading: true, error: '', ...wyre })
    let oAuthUrl
    try {
      oAuthUrl = await getOAuthUrl(PLAID)
      if (
        (oAuthUrl == null || oAuthUrl == '') &&
        errorOAuth != '' &&
        errorOAuth != null
      ) {
        if (errorOAuth.contains('WYRE')) {
          wyre.error = errorOAuth
          document.getElementById('connection-button').disabled = false
          return setWyre({ isLoading: false, error: errorOAuth, ...wyre })
        }
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

  const withdrawWyre = async (amount) => {
    try {
      if (amount < 1)
        return setWyre({
          ...wyre,
          isLoading: false,
          error: 'Amount must be greater than 0',
        })
      setWyre({ ...wyre, isLoading: true, error: null })
      const {
        data: { rampWithdraw },
      } = await rampWithdrawMutation({
        variables: { type: WYRE, amount },
      })
      toast.success(
        <TxToast text="Withdraw submitted" txHash={rampWithdraw.id} />,
        { id: rampWithdraw.id }
      )
    } catch (e) {
      setWyre({ ...wyre, isLoading: false, error: e.message })
    }
  }

  // const connectCoinbase = async () => {
  //   document.getElementById('connection-button').disabled = true
  //   setCoinbase({ isLoading: true, error: '', ...coinbase })
  //   try {
  //     await openOAuthUrl(COINBASE)
  //     setShouldPoll(true)
  //     document.getElementById('connection-button').disabled = false
  //   } catch (error) {
  //     coinbase.error = error
  //     document.getElementById('connection-button').disabled = false
  //     return setCoinbase({ isLoading: false, error: error, ...coinbase })
  //   }
  // }

  // const withdrawCoinbase = async (amount) => {
  //   try {
  //     setCoinbase({ isLoading: true, error: null, ...coinbase })
  //     const {
  //       data: { rampWithdraw },
  //     } = await rampWithdrawMutation({
  //       variables: { type: COINBASE, amount },
  //     })
  //     toast.success(
  //       <TxToast text="Withdraw submitted" txHash={rampWithdraw.id} />,
  //       {
  //         id: rampWithdraw.id,
  //       }
  //     )
  //     setCoinbase({ isLoading: false, ...coinbase })
  //   } catch (e) {
  //     setCoinbase({ isLoading: false, error: e.message, ...coinbase })
  //   }
  // }

  React.useEffect(() => {
    if (errorOAuth != '' && errorOAuth != null) {
      if (errorOAuth.includes('COINBASE')) {
        coinbase.error = errorOAuth
        setCoinbase({
          ...coinbase,
          error: errorOAuth,
        })
      } else if (errorOAuth.includes('WYRE')) {
        wyre.error = errorOAuth
        setWyre({
          ...wyre,
          error: errorOAuth,
        })
      }
    }
    if (!ramps) return
    updateRamps()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ramps, errorOAuth])

  return (
    <RampContext.Provider
      value={{
        isLoading: state.isLoading || rampsLoading,
        rampError: rampError || state.rampError,
        getRampUrl,
        offRamps: [
          {
            ...wyre,
            onConnect: connectWyre,
            onWithdraw: withdrawWyre,
          },
          // Disabled
          // {
          //   ...coinbase,
          //   onConnect: connectCoinbase,
          //   onWithdraw: withdrawCoinbase,
          // },
          { ...pelerin },
          { ...externalTransfer },
        ],
      }}
    >
      {children}
    </RampContext.Provider>
  )
}

export { RampProvider, useRamp }
