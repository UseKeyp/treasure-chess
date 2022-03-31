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
  const error_description = url.searchParams.get('error_description')
  const orderId = url.searchParams.get('orderId')
  const type = url.pathname.split('/redirect/')[1]

  // ###############  Login  ################
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
      navigate(getRedirectTo() || '/')
    }
  }

  // ###############  General oAuth  ################
  const submitCodeGrant = async () => {
    try {
      const {
        data: { codeGrant: codeGrantData },
      } = await codeGrant({
        variables: { type: type.toUpperCase(), code, state: grantState },
      })
      if (codeGrantData.status === 'SUCCESS') {
        setState({
          isLoading: false,
          successMessage: 'Great - connection complete!',
        })
      } else {
        setState({ isLoading: false, errorMessage: 'Something went wrong' })
      }
    } catch (error) {
      setState({ isLoading: false, errorMessage: error.message })
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
    submitCodeGrant()
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
