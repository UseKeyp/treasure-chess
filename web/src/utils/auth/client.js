import { saveRedirectTo } from './helpers'

import { toast } from '@redwoodjs/web/toast'

export const CHESS_LOGIN_URL_QUERY = gql`
  query ChessLoginUrlQuery {
    chessLoginUrl {
      url
    }
  }
`

export const logIn = async ({ redirectTo }) => {
  try {
    saveRedirectTo(redirectTo)
    /* eslint-disable-next-line no-undef */
    const response = await global.fetch(
      /* eslint-disable-next-line no-undef */
      global.RWJS_API_GRAPHQL_URL,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: CHESS_LOGIN_URL_QUERY,
        }),
      }
    )
    if (response.ok) {
      // Redirect user
      const { data } = await response.json()
      if (!data) throw 'No data in API response'
      window.location = data.chessLoginUrl.url
    } else {
      /* eslint-disable-next-line no-console */
      console.log(
        `Could not get login url: ${response.statusText} (${response.status})`
      )
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    const errorMessage = `Oops! Please try again later. ${e}`
    toast.error(errorMessage)
    /* eslint-disable-next-line no-console */
    console.log(errorMessage)
  }
}
