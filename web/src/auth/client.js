// Adapted from https://github.com/oneclickdapp/ethereum-auth

import { getErrorResponse } from 'src/auth/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'
import { torus, loginWithTorus } from 'src/auth/torus'
import { isProduction } from 'src/utils/helpers'

export const LOGIN_URL_QUERY = gql`
  query LoginUrlQuery {
    loginUrl {
      url
    }
  }
`

class TreasureChessAuthClient {
  constructor({ debug, onNetworkChange, onDisconnect, makeQuery }) {
    this.debug = debug
    this.onNetworkChange = onNetworkChange
    this.onDisconnect = onDisconnect
    this.makeQuery = makeQuery
  }

  async login() {
    try {
      // Get redirect URL
      const url = await this.makeQuery(LOGIN_URL_QUERY)
      // Redirect user
      window.location = url
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.log(
        getErrorResponse(`${e}. See above error for more details.`, 'login')
          .error.message
      )
    }
  }

  logout() {
    return localStorage.removeItem(LOCAL_TOKEN_KEY)
  }

  getToken() {
    return localStorage.getItem(LOCAL_TOKEN_KEY)
  }

  userMetadata() {
    // TODO: remove console.logs
    /* eslint-disable-next-line no-console */
    console.log('getting user metadata')
    /* eslint-disable-next-line no-console */
    console.log(localStorage.getItem(LOCAL_TOKEN_KEY))
    return JSON.parse(localStorage.getItem(LOCAL_TOKEN_KEY))
  }
}

export default TreasureChessAuthClient
