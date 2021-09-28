// Adapted from https://github.com/oneclickdapp/ethereum-auth

import { getErrorResponse, saveJwt, getJwt, deleteJwt } from 'src/auth/helpers'

import { isProduction } from 'src/utils/helpers'
import { toast } from '@redwoodjs/web/toast'
import { decode as decodeJwt, verify as verifyJwt } from 'jsonwebtoken'

export const LOGIN_URL_QUERY = gql`
  query LoginUrlQuery {
    loginUrl {
      url
    }
  }
`
export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshTokenQuery {
    refreshToken {
      jwt
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
    return deleteJwt()
  }

  getToken() {
    // console.log('Getting token')
    // const jwt = getJwt()
    // return jwt
    return getJwt()
    // try {
    //   let jwt = getJwt()
    //   if (!jwt) return null
    //   const decoded = decodeJwt(jwt)
    //   // TODO: remove true check
    //   if (true) {
    //     // if (new Date(decoded.exp * 1000) > new Date()) {
    //     const response = await global.fetch(
    //       `${global.__REDWOOD__API_PROXY_PATH}/graphql`,
    //       {
    //         method: 'POST',
    //         headers: {
    //           'content-type': 'application/json',
    //           'auth-provider': 'custom',
    //           authorization: `Bearer ${jwt}`,
    //         },
    //         body: JSON.stringify({
    //           mutation: REFRESH_TOKEN_MUTATION,
    //         }),
    //       }
    //     )
    //     if (response.ok) {
    //       const { data } = await response.json()
    //       jwt = data?.refreshToken?.jwt
    //     } else {
    //       console.log(
    //         `Could not refresh token: ${response.statusText} (${response.status})`
    //       )
    //     }
    //     saveJwt(jwt)
    //   }
    //   return jwt
    // } catch (e) {
    //   /* eslint-disable-next-line no-console */
    //   const errorMessage = getErrorResponse(`${e}.`, 'getToken').error.message
    //   toast.error(errorMessage)
    //   console.log(errorMessage)
    // }
  }

  getUserMetadata() {
    return decodeJwt(getJwt())
  }
}

export default TreasureChessAuthClient
