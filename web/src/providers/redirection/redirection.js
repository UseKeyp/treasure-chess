import { navigate } from '@redwoodjs/router'
import { getRedirectTo, APPROVED_LOGIN_PROVIDERS } from 'src/utils/auth/helpers'
import { useAuth } from '@redwoodjs/auth'
import { useOAuth } from 'src/providers/oAuth'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

const RedirectionContext = React.createContext({})

const RedirectionProvider = ({ children }) => {
  const [state, setState] = React.useState({ isLoading: true })

  const { logIn, reauthenticate } = useAuth()
  const { submitCodeGrant } = useOAuth()

  let url
  let code
  let grantState
  /* eslint-disable camelcase */
  let error_description
  let error
  let orderId
  let type

  if (isBrowser) {
    url = new URL(window.location.href) // Support prerender
    code = url.searchParams.get('code')
    grantState = url.searchParams.get('state')
    error = url.searchParams.get('error')
    error_description = url.searchParams.get('error_description')
    orderId = url.searchParams.get('orderId')
    type = url.pathname.split('/redirect/')[1]
  }

  const submitLoginCodeGrant = async () => {
    const response = await logIn({
      code,
      state: grantState,
      type: type.toUpperCase(),
      method: 'login',
    })
    if (response.error || !response)
      return setState({
        isLoading: false,
        errorMessage: response.error || 'Something went wrong',
      })
    if (response.id) {
      await reauthenticate()
      setState({
        isLoading: false,
        successMessage: "Great - You're signed in!",
      })
      setTimeout(() => {
        navigate(getRedirectTo() || '/profile')
      }, [3000])
    }
  }

  const completeOAuth = async () => {
    const { error: codeGrantError, successMessage: successMessageCodeGrant } =
      await submitCodeGrant({ code, grantState, type })
    if (codeGrantError)
      return setState({ errorMessage: codeGrantError, isLoading: false })
    setState({ successMessage: successMessageCodeGrant, isLoading: false })
  }

  const completeWyreOrder = async () => {
    if (!orderId || error)
      return setState({
        isLoading: false,
        errorMessage:
          "Your debit-card wasn't accepted by Wyre. Please reach out to us if this keeps happening.",
      })
    setState({
      isLoading: false,
      orderSubmitted: true,
      successMessage: 'Great - payment complete!',
    })
  }

  React.useEffect(() => {
    if (!isBrowser) return
    if (!url.pathname.includes('/redirect')) return
    if (error)
      return setState({
        isLoading: false,
        errorMessage: error_description || 'Something went wrong',
      })
    if (type === 'wyre') return completeWyreOrder()
    if (!code || !grantState)
      return setState({
        isLoading: false,
        errorMessage: 'Invalid redirect parameters',
      })
    if (APPROVED_LOGIN_PROVIDERS.includes(type.toUpperCase()))
      return submitLoginCodeGrant()
    completeOAuth()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [code, grantState])

  return (
    <RedirectionContext.Provider value={state}>
      {children}
    </RedirectionContext.Provider>
  )
}

const useRedirection = () => React.useContext(RedirectionContext)

export { RedirectionProvider, useRedirection }
