import { useLazyQuery, useMutation } from '@apollo/client'
import { useToast } from 'src/providers/toast'

import { OAUTH_URL_QUERY, OAUTH_CODE_GRANT_MUTATION } from './graphql'

const OAuthContext = React.createContext({
  isLoading: true,
})

const OAuthProvider = ({ children }) => {
  const { toast } = useToast()
  const [state, setState] = React.useState({})

  const [oAuthUrlQuery] = useLazyQuery(OAUTH_URL_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [codeGrantMutation] = useMutation(OAUTH_CODE_GRANT_MUTATION)

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

  const submitCodeGrant = async ({ code, grantState, type, accountId }) => {
    try {
      const { data } = await codeGrantMutation({
        variables: {
          type: type.toUpperCase(),
          code,
          state: grantState,
          accountId,
        },
      })
      const { codeGrant } = data
      if (codeGrant.status === 'SUCCESS') {
        setState({ isLoading: false })
        return {
          data: codeGrant,
          successMessage: 'Great - connection complete!',
        }
      } else {
        const errorMessage = 'Something went wrong'
        setState({ isLoading: false, error: errorMessage })
        return { error: errorMessage }
      }
    } catch (error) {
      setState({ isLoading: false, error: error.message })
      return { error: error.message }
    }
  }

  return (
    <OAuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        getOAuthUrl,
        submitCodeGrant,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
}

const useOAuth = () => React.useContext(OAuthContext)

export { OAuthProvider, useOAuth }
