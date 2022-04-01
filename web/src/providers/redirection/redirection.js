import { navigate } from '@redwoodjs/router'
import { getRedirectTo, APPROVED_LOGIN_PROVIDERS } from 'src/utils/auth/helpers'
import { useAuth } from '@redwoodjs/auth'
import { useOAuth } from 'src/providers/oAuth'

const RedirectionContext = React.createContext({})

const RedirectionProvider = ({ children }) => {
  const [state, setState] = React.useState({ isLoading: true })

  const { logIn, reauthenticate } = useAuth()
  const { submitCodeGrant } = useOAuth()

  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const grantState = url.searchParams.get('state')
  const error = url.searchParams.get('error')
  /* eslint-disable camelcase */
  const error_description = url.searchParams.get('error_description')
  const orderId = url.searchParams.get('orderId')
  const type = url.pathname.split('/redirect/')[1]

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
        successMessage: "Great - You're logged in!",
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
        errorMessage: 'Wyre checkout failed',
      })
    setState({
      isLoading: false,
      orderSubmitted: true,
      successMessage: 'Great - payment complete!',
    })
  }

  React.useEffect(() => {
    if (!url.pathname.includes('/redirect')) return
    if (error)
      return setState({
        isLoading: false,
        errorMessage: error_description || 'Something went wrong',
      })
    if (!code || !grantState)
      return setState({
        isLoading: false,
        errorMessage: 'Invalid redirect parameters',
      })
    if (APPROVED_LOGIN_PROVIDERS.includes(type.toUpperCase()))
      return submitLoginCodeGrant()
    if (type === 'wyre') return completeWyreOrder()
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
