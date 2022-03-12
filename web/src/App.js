import * as Sentry from '@sentry/browser'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { AuthProvider, useAuth } from '@redwoodjs/auth'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import AllContextProviders from 'src/providers'
import LandingModal from 'src/components/LandingModal'
import { logIn } from 'src/utils/auth/client'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

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

const SentryInjector = () => {
  const { currentUser } = useAuth
  try {
    Sentry.init({
      dsn: 'https://0723d14bc0b94064902f01f77a915392@o1016103.ingest.sentry.io/5981718',
      // ENVIRONMENT is coming from env
      beforeSend(event) {
        // Check if it is an exception, and if so, show the report dialog
        // if (event.exception) {
        //   Sentry.showReportDialog({ eventId: event.event_id })
        // }
        return event
      },
    })
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
  }
  if (currentUser) {
    /* eslint-disable-next-line no-undef */
    _paq.push(['setUserId', currentUser.username]) // Matomo user
    Sentry.setUser(currentUser)
  }
  return null
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProviderExtended
        type="dbAuth"
        config={{ fetchConfig: { credentials: 'include' } }}
      >
        <SentryInjector />
        <RedwoodApolloProvider
          graphQLClientConfig={{ httpLinkConfig: { credentials: 'include' } }}
        >
          <AllContextProviders>
            <LandingModal />
            <Routes />
          </AllContextProviders>
        </RedwoodApolloProvider>
      </AuthProviderExtended>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
