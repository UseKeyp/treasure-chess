import { useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { useToast } from 'src/providers/toast'

import { OAUTH_URL_QUERY } from './graphql'

const PLAID = 'plaid'
const COINBASE = 'COINBASE'
const WYRE = 'WYRE'

const OAuthContext = React.createContext({
  isLoading: true,
})

const OAuthProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [state, setState] = React.useState({})

  const [oAuthUrlQuery] = useLazyQuery(OAUTH_URL_QUERY, {
    fetchPolicy: 'network-only',
  })

  const getOAuthUrl = async (type) => {
    try {
      if (!type) throw 'No type provided'
      setState({ isLoading: true })
      const { data, error } = await oAuthUrlQuery({
        variables: { type },
      })
      if (error) throw error
      setState({})
      return data.oAuthUrl
    } catch (e) {
      const errorMessage = `Error fetching ${type} link. ${e?.message}`
      toast.error(errorMessage)
      return setState({ error: errorMessage, isLoading: false })
    }
  }

  return (
    <OAuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        getOAuthUrl,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
}

const useOAuth = () => React.useContext(OAuthContext)

export { OAuthProvider, useOAuth }
