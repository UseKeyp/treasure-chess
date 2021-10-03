import { useMutation } from '@redwoodjs/web'
import { routes, navigate, useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { getRedirectTo } from 'src/auth/helpers'
import { LOCAL_TOKEN_KEY } from 'src/auth/constants'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'

const Redirect = ({ type }) => {
  const [errorMessage, setErrorMessage] = React.useState()
  const { code, state } = useParams()
  const { logIn } = useAuth()

  const checkValidParams = () => {
    if (!code || !state) setErrorMessage('Invalid redirect parameters')
  }

  const submitOauthCodeGrant = async () => {
    // Call the dbAuth login function
    const response = await fetch(`${global.__REDWOOD__API_PROXY_PATH}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'chess', code, state, method: 'login' }),
    }).then((res) => {
      return res.json()
    })
    if (response.error) return setErrorMessage(response.error)
    if (response.id) navigate(getRedirectTo() || '/')
  }

  React.useEffect(() => {
    checkValidParams()
    submitOauthCodeGrant()
  }, [])

  if (errorMessage)
    return (
      <DefaultLayout>
        <div className="mt-8 sm:text-center lg:text-left">
          <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            ⛈️ Oops! Something went wrong
          </h1>
          <div className=" mt-8 rw-cell-error">
            {errorMessage.substring(0, 200)}
          </div>
          <button onClick={logIn}>
            <p className="mt-8 text-s text-grey-600">
              <b>Try again</b>
            </p>
          </button>
        </div>
      </DefaultLayout>
    )
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Redirect
