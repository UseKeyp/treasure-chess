import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider } from '@redwoodjs/auth'
import { FetchConfigProvider, useFetchConfig } from '@redwoodjs/web'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import { ContextProvider } from 'src/providers/context'
import CustomAuthClient from 'src/auth/client'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

let customAuthClient
// For more examples see https://github.com/oneclickdapp/ethereum-auth
const ApolloInjector = ({ children }) => {
  const { uri, headers } = useFetchConfig()
  try {
    const graphQLClient = new ApolloClient({
      cache: new InMemoryCache(),
      uri,
      headers,
    })
    const makeQuery = (query, variables) =>
      graphQLClient.query({
        query,
        variables,
      })

    customAuthClient = new CustomAuthClient({
      makeQuery,
      debug: process.NODE_ENV === 'development',
    })
  } catch (e) {
    console.log(e)
  }
  return React.cloneElement(children, { client: customAuthClient })
}

console.log('++++++++++++++++++++++++++')
console.log(' ')
console.log(`( ͡ᵔ ͜ʖ ͡ᵔ) Oh hello there! We're hiring - hit us up on Discord.`)
console.log(' ')
console.log('++++++++++++++++++++++++++')

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <FetchConfigProvider>
        <ApolloInjector>
          <AuthProvider client={customAuthClient} type="custom">
            <RedwoodApolloProvider>
              <ContextProvider>
                <Routes />
              </ContextProvider>
            </RedwoodApolloProvider>
          </AuthProvider>
        </ApolloInjector>
      </FetchConfigProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
