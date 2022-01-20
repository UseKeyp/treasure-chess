import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import AllContextProviders from 'src/providers'
import { logIn } from 'src/utils/auth/client'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

/* eslint-disable no-console */
/* eslint-disable no-irregular-whitespace */
console.log(
  '%cTreasure Chess',
  'color:#88C54B;font-family:sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold'
)
console.log(
  `%c👋 Howdy! We're hiring https://github.com/treasure-chess/jobs`,
  'font-family:sans-serif;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold'
)
/* eslint-enable no-irregular-whitespace */
/* eslint-enable no-console */

class AuthProviderExtended extends AuthProvider {
  constructor(props) {
    super(props)
    this.rwClient.login = logIn
  }
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProviderExtended type="dbAuth">
        <RedwoodApolloProvider>
          <AllContextProviders>
            <Routes />
          </AllContextProviders>
        </RedwoodApolloProvider>
      </AuthProviderExtended>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
