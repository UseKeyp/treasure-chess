import { getErrorResponse, saveRedirectTo } from 'src/auth/helpers'

import { toast } from '@redwoodjs/web/toast'

export const LOGIN_URL_QUERY = gql`
  query LoginUrlQuery {
    loginUrl {
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
      `${global.RWJS_API_GRAPHQL_URL}/graphql`,
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
      /* eslint-disable-next-line no-console */
      console.log(
        `Could not get login url: ${response.statusText} (${response.status})`
      )
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    const errorMessage = getErrorResponse(`${e}.`, 'login').error.message
    toast.error(errorMessage)
    /* eslint-disable-next-line no-console */
    console.log(errorMessage)
  }
}
