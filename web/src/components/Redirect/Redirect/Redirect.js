import { navigate, useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { getRedirectTo } from 'src/auth/helpers'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'

const Redirect = ({ type }) => {
  const [errorMessage, setErrorMessage] = React.useState()
  const [orderSubmitted, setOrderSubmitted] = React.useState()
  const { code, state, orderId } = useParams()
  const { logIn } = useAuth()

  // ###############  Chess.com  ################
  const checkValidChessParams = () => {
    if (!code || !state) setErrorMessage('Invalid redirect parameters')
  }

  const submitOauthCodeGrant = async () => {
    // Call the dbAuth login function
    /* eslint-disable-next-line no-undef */
    const response = await fetch(`${global.__REDWOOD__API_PROXY_PATH}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state, method: 'login' }),
    }).then((res) => {
      return res.json()
    })
    if (response.error) return setErrorMessage(response.error)
    if (response.id) navigate(getRedirectTo() || '/')
  }

  // ###############  Wyre  #####################
  const checkValidWyreParams = () => {
    if (!orderId) setErrorMessage('Invalid redirect parameters')
  }
  const submitWyreOrder = async () => {
    const response = await fetch(`${global.__REDWOOD__API_PROXY_PATH}/wyre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, method: 'completeOrder' }),
    }).then((res) => {
      return res.json()
    })
    if (response.error) return setErrorMessage(response.error)
    setTimeout(() => {
      window.close()
    }, [3000])
  }

  React.useEffect(() => {
    if (type === 'wyre') {
      checkValidWyreParams()
      submitWyreOrder()
    } else if (type === 'chess') {
      checkValidChessParams()
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
      <div className="flex-grow min-w-screen min-h-screen ">
        <div className="mt-16 flex items-center justify-center">
          <Icon name="checkmark" width="2rem" height="2rem" color="green" />
          <p>Purchase successful! Taking you back to Treasure Chess...</p>
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
