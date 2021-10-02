// Adapted from https://github.com/oneclickdapp/ethereum-auth

import { getErrorResponse } from 'src/auth/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'
import { isProduction } from 'src/utils/helpers'
import { toast } from '@redwoodjs/web/toast'
import { decode as decodeJwt } from 'jsonwebtoken'

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
    this.type = 'custom'
  }

  async login() {
    try {
      // Get redirect URL
      const { data } = await this.makeQuery(LOGIN_URL_QUERY)
      // Redirect user
      window.location = data.loginUrl.url
    } catch (e) {
      /* eslint-disable-next-line no-console */
      const errorMessage = getErrorResponse(`${e}.`, 'login').error.message
      toast.error(errorMessage)
      console.log(errorMessage)
    }
  }

  logout() {
    return localStorage.removeItem(LOCAL_TOKEN_KEY)
  }

  getToken() {
    return localStorage.getItem(LOCAL_TOKEN_KEY)
  }

  userMetadata() {
    return decodeJwt(this.getToken())
  }
}

export default TreasureChessAuthClient
