import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { getRedirectTo } from 'src/utils/auth/helpers'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'

const Redirect = ({ type }) => {
  const [errorMessage, setErrorMessage] = React.useState()
  const [orderSubmitted, setOrderSubmitted] = React.useState()
  const { code, state } = useParams()
  const { logIn } = useAuth()

  // ###############  Chess.com  ################
  const submitOauthCodeGrant = async () => {
    if (!code || !state) return setErrorMessage('Invalid redirect parameters')
    /* eslint-disable-next-line no-undef */
    const response = await fetch(global.RWJS_API_DBAUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state, method: 'login' }),
    }).then((res) => {
      return res.json()
    })
    if (response.error || !response) return setErrorMessage(response.error)
    if (response.id) navigate(getRedirectTo() || '/')
  }

  // ###############  Wyre  #####################
  const completeWyreOrder = async () => {
    setOrderSubmitted(true)
    setTimeout(() => {
      window.close()
    }, [1000])
  }

  React.useEffect(() => {
    if (type === 'wyre') {
      completeWyreOrder()
    } else if (type === 'chess') {
      submitOauthCodeGrant()
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [code, state, type])

  if (errorMessage)
    return (
      <DefaultLayout>
        <div className="mt-8 sm:text-center lg:text-left">
          <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span role="img" aria-label="cloud_with_lightning_and_rain">
              ⛈️
            </span>{' '}
            Oops! Something went wrong
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
  if (orderSubmitted)
    return (
      <div className="min-w-screen min-h-screen ">
        <div className="mt-16 text-center justify-center">
          <div className="flex justify-center">
            <Icon name="checkmark" width="3rem" height="3rem" color="green" />
            <h1 className="text-5xl ml-4 font-extrabold">Payment complete!</h1>
          </div>
          <p className="text-s m-4">Taking you back to Treasure Chess...</p>
          <Link className="text-s mt-4" to={routes.profile()}>
            (Go to my Profile)
          </Link>
        </div>
      </div>
    )
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default Redirect
