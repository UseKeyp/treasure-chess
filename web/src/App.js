import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { AuthProvider } from '@redwoodjs/auth'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { KonstaProvider } from 'konsta/react'

import LandingModal from 'src/components/LandingModal'
import { logIn } from 'src/utils/auth/client'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import 'src/i18n'

import './scaffold.css'
import './index.scss'

/* eslint-disable no-console */
/* eslint-disable no-irregular-whitespace */
console.log(
  '%c🛑 STOP ',
  'color:red;font-family:sans-serif;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold'
)
console.log(
  `%c⚠️ This is a browser feature intended for developers. Do not paste anything here! If someone told you to copy and paste something here, it is a scam and could give them access to your Treasure Chess account. ⚠️`,
  'font-family:sans-serif;font-size:1rem;-webkit-text-stroke: 1px black;'
)
console.log(
  `%cAre you a developer? We have open positions posted here >> https://github.com/treasure-chess/jobs`,
  'font-family:sans-serif;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold'
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
    <KonstaProvider theme="ios">
      <RedwoodProvider titleTemplate="%AppTitle | %PageTitle">
        <AuthProviderExtended
          type="dbAuth"
          config={{ fetchConfig: { credentials: 'include' } }}
        >
          <RedwoodApolloProvider
            graphQLClientConfig={{ httpLinkConfig: { credentials: 'include' } }}
          >
            <LandingModal />

            <Routes />
          </RedwoodApolloProvider>
        </AuthProviderExtended>
      </RedwoodProvider>
    </KonstaProvider>
  </FatalErrorBoundary>
)

export default App
