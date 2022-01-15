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
console.log(`    /$$$$$$$$                                                                           /$$$$$$  /$$
   |__  $$__/                                                                          /$$__  $$| $$
      | $$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$ /$$   /$$  /$$$$$$   /$$$$$$       | $$  \\__/| $$$$$$$   /$$$$$$   /$$$$$$$ /$$$$$$$
      | $$ /$$__  $$ /$$__  $$ |____  $$ /$$_____/| $$  | $$ /$$__  $$ /$$__  $$      | $$      | $$__  $$ /$$__  $$ /$$_____//$$_____/
      | $$| $$  \\__/| $$$$$$$$  /$$$$$$$|  $$$$$$ | $$  | $$| $$  \\__/| $$$$$$$$      | $$      | $$  \\ $$| $$$$$$$$|  $$$$$$|  $$$$$$
      | $$| $$      | $$_____/ /$$__  $$ \\____  $$| $$  | $$| $$      | $$_____/      | $$    $$| $$  | $$| $$_____/ \\____  $$\\____  $$
      | $$| $$      |  $$$$$$$|  $$$$$$$ /$$$$$$$/|  $$$$$$/| $$      |  $$$$$$$      |  $$$$$$/| $$  | $$|  $$$$$$$ /$$$$$$$//$$$$$$$/
      |__/|__/       \\_______/ \\_______/|_______/  \\______/ |__/       \\_______/       \\______/ |__/  |__/ \\_______/|_______/|_______/

   Hey, you! Looking for a job?
   https://github.com/treasure-chess/jobs`)
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
