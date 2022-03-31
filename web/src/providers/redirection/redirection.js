import { useMutation } from '@apollo/client'

import { navigate } from '@redwoodjs/router'
import { getRedirectTo, APPROVED_LOGIN_PROVIDERS } from 'src/utils/auth/helpers'
import { useAuth } from '@redwoodjs/auth'

import { OAUTH_CODE_GRANT_MUTATION } from './graphql'

const RedirectionContext = React.createContext({})

const RedirectionProvider = ({ children }) => {
  const [state, setState] = React.useState({ isLoading: true })

  const { logIn, reauthenticate } = useAuth()

  const [codeGrant] = useMutation(OAUTH_CODE_GRANT_MUTATION)

  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const grantState = url.searchParams.get('state')
  const error = url.searchParams.get('error')
  const orderId = url.searchParams.get('orderId')
  const type = url.pathname.split('/redirect/')[1]

  // ###############  Login  ################
  const submitLoginCodeGrant = async () => {
    if (!code || !grantState || !type)
      return setState({
        isLoading: false,
        errorMessage: 'Invalid redirect parameters',
      })
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
      navigate(getRedirectTo() || '/')
    }
  }

  // ###############  General oAuth  ################
  const submitCodeGrant = async () => {
    try {
      if (!code || !grantState)
        return setState({
          isLoading: false,
          errorMessage: 'Invalid redirect parameters',
        })
      /* eslint-disable-next-line no-undef */
      const {
        data: { codeGrant: codeGrantData },
      } = await codeGrant({
        variables: {
          type,
          code,
          state: grantState,
        },
        fetchPolicy: 'network-only',
      })
      if (codeGrantData.status === 'SUCCESS') {
        setState({
          isLoading: false,
          successMessage: 'Great - connection complete!',
        })
      } else {
        setState({
          isLoading: false,
          errorMessage: 'Something went wrong',
        })
      }
    } catch (error) {
      setState({
        isLoading: false,
        errorMessage: error.message,
      })
    }
  }

  // ###############  Wyre  #####################
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
    if (error)
      return setState({
        isLoading: false,
        errorMessage: 'Something went wrong',
      })
    if (!type) return
    console.log(type)
    if (APPROVED_LOGIN_PROVIDERS.includes(type.toUpperCase()))
      return submitLoginCodeGrant()
    if (type === 'wyre') return completeWyreOrder()
    submitCodeGrant()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [code, grantState, type])

  return (
    <RedirectionContext.Provider value={state}>
      {children}
    </RedirectionContext.Provider>
  )
}

const useRedirection = () => React.useContext(RedirectionContext)

export { RedirectionProvider, useRedirection }
