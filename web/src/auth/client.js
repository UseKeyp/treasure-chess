// Adapted from https://github.com/oneclickdapp/ethereum-auth

import {
  getErrorResponse,
  saveJwt,
  getJwt,
  deleteJwt,
  saveRedirectTo,
} from 'src/auth/helpers'

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

  async login({ redirectTo }) {
    try {
      if (redirectTo) saveRedirectTo(redirectTo)
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

  getToken() {
    return getJwt()
  }

  getUserMetadata() {
    return decodeJwt(this.getToken())
  }
}

export default TreasureChessAuthClient

export const login = async ({ redirectTo }) => {
  try {
    redirectTo && saveRedirectTo(redirectTo)
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
