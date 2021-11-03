import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { ContextProvider } from 'src/providers/context'
import { ThemeProvider } from 'src/providers/theme'
import TokenSessionProvider from 'src/providers/tokenSession'
import { logIn } from 'src/auth/client'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

/* eslint-disable no-console */
/* eslint-disable no-irregular-whitespace */
console.log('++++++++++++++++++++++++++')
console.log()
console.log(`( ͡ᵔ ͜ʖ ͡ᵔ) Oh hello there! We're hiring - hit us up on Discord.`)
console.log()
console.log('++++++++++++++++++++++++++')
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
          <TokenSessionProvider />
          <ThemeProvider>
            <ContextProvider>
              <Routes />
            </ContextProvider>
          </ThemeProvider>
        </RedwoodApolloProvider>
      </AuthProviderExtended>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
