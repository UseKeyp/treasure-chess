import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { ContextProvider } from 'src/providers/context'
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

const dbAuth = new AuthProvider({ type: 'dbAuth' })
dbAuth.logIn = logIn // Replace with our OAuth redirect
const CustomDbAuth = () => dbAuth
CustomDbAuth.prototype = React.Component.prototype

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <CustomDbAuth type="dbAuth">
        <RedwoodApolloProvider>
          <TokenSessionProvider />
          <ContextProvider>
            <Routes />
          </ContextProvider>
        </RedwoodApolloProvider>
      </CustomDbAuth>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
