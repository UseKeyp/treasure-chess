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
export const REFRESH_TOKEN_QUERY = gql`
  query refreshTokenQuery {
    refreshToken {
      jwt
    }
  }
`

class TreasureChessAuthClient {
  constructor({ debug }) {
    this.debug = debug
    this.type = 'custom'
  }

  async login() {
    try {
      const response = await global.fetch(
        `${global.__REDWOOD__API_PROXY_PATH}/graphql`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            query: LOGIN_URL_QUERY,
          }),
        }
      )
      if (response.ok) {
        // Redirect user
        const { data } = await response.json()
        window.location = data.loginUrl.url
      } else {
        console.log(
          `Could not get login url: ${response.statusText} (${response.status})`
        )
      }
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

  async getToken() {
    console.log('getting token')
    let jwt = getJwt()
    try {
      if (!jwt) return null
      const decoded = decodeJwt(jwt)
      // TODO: remove true check
      if (true) {
        // if (new Date(decoded.exp * 1000) > new Date()) {
        const response = await global.fetch(
          `${global.__REDWOOD__API_PROXY_PATH}/graphql`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'auth-provider': 'custom',
              authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              query: REFRESH_TOKEN_QUERY,
            }),
          }
        )
        if (response.ok) {
          const { data, errors } = await response.json()
          if (errors) throw `Could not refresh token: ${errors[0].message}`
          jwt = data?.refreshToken?.jwt
          saveJwt(jwt)
          return jwt
        } else {
          throw `Could not refresh token: ${response.statusText} (${response.status})`
        }
      }
    } catch (e) {
      /* eslint-disable-next-line no-console */
      const errorMessage = getErrorResponse(`${e}.`, 'getToken').error.message
      toast.error(errorMessage)
      return jwt
    }
  }

  async getUserMetadata() {
    const token = await this.getToken()
    console.log(token)
    return decodeJwt(token)
  }
}

export default TreasureChessAuthClient
