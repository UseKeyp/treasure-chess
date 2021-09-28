import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { ContextProvider } from 'src/providers/context'
import TokenSessionProvider from 'src/providers/tokenSession'
import CustomAuthClient from 'src/auth/client'
import { isProduction } from 'src/utils/helpers'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.scss'

console.log('++++++++++++++++++++++++++')
console.log(' ')
console.log(`( ͡ᵔ ͜ʖ ͡ᵔ) Oh hello there! We're hiring - hit us up on Discord.`)
console.log(' ')
console.log('++++++++++++++++++++++++++')

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider
        client={
          new CustomAuthClient({
            debug: !isProduction,
          })
        }
        type="custom"
      >
        <RedwoodApolloProvider>
          <TokenSessionProvider />
          <ContextProvider>
            <Routes />
          </ContextProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
