import { useMutation } from '@apollo/client'

import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { getRedirectTo } from 'src/utils/auth/helpers'
import globalConfig from 'src/global.config.js'

import DefaultLayout from 'src/layouts/DefaultLayout'
import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'

import { OAUTH_CODE_GRANT_MUTATION } from './graphql'

const Redirect = ({ type }) => {
  const [errorMessage, setErrorMessage] = React.useState()
  const [orderSubmitted, setOrderSubmitted] = React.useState()
  const [successMessage, setSuccessMessage] = React.useState()
  const { code, state } = useParams()
  const { logIn } = useAuth()
  const [codeGrant] = useMutation(OAUTH_CODE_GRANT_MUTATION)

  // ###############  Chess.com  ################
  const submitLoginCodeGrant = async () => {
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

  // ###############  General oAuth  ################
  const submitCodeGrant = async () => {
    try {
      if (!code || !state) return setErrorMessage('Invalid redirect parameters')
      /* eslint-disable-next-line no-undef */
      const {
        data: { codeGrant: codeGrantData },
      } = await codeGrant({
        variables: {
          type,
          code,
          state,
        },
        fetchPolicy: 'network-only',
      })
      if (codeGrantData.status === 'SUCCESS') {
        setSuccessMessage('Connection complete')
        setTimeout(() => {
          window.close()
        }, [1000])
      } else {
        setErrorMessage('Something went wrong')
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  // ###############  Wyre  #####################
  const completeWyreOrder = async () => {
    setOrderSubmitted(true)
    setTimeout(() => {
      window.close()
    }, [1000])
  }

  React.useEffect(() => {
    if (type === 'chess') {
      submitLoginCodeGrant()
    } else if (type === 'wyre') {
      completeWyreOrder(type)
    } else {
      submitCodeGrant()
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [code, state, type])

  if (errorMessage)
    return (
      <DefaultLayout>
        <div className="flex justify-center">
          <div className="redirect-error-container">
            <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
              <span className="block xl:inline">
                <span role="img" aria-label="cloud_with_lightning_and_rain">
                  ⛈️
                </span>{' '}
                Redirect error
              </span>
            </h1>
            {typeof errorMessage === 'string' ? (
              <h3 className="mt-8 font-bold text-[#FFBB0D]">
                {errorMessage.substring(0, 200)}
              </h3>
            ) : null}
            <h3 className="mt-8 text-center">Login using your Chess account</h3>
            <div className="login-portal-container--button-wrapper">
              <Button
                onClick={() => logIn({ redirectTo: routes.profile() })}
                variant="green"
                size="small"
              >
                <Icon size="30" name="chess_com" className="mr-4" />
              </Button>
            </div>

            <h4>
              By continuing you acknowledge that you have read, understand, and
              agree to the
              <a href={globalConfig.TOC_URL}>
                <span className="text-blue"> Terms of Service </span>
              </a>
              and
              <a href={globalConfig.PRIVACY_POLICY_URL}>
                <span className="text-blue"> Privacy Policy</span>
              </a>
              .
            </h4>
          </div>
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
  if (successMessage)
    return (
      <div className="min-w-screen min-h-screen ">
        <div className="mt-16 text-center justify-center">
          <div className="flex justify-center">
            <Icon name="checkmark" width="3rem" height="3rem" color="green" />
            <h1 className="text-5xl ml-4 font-extrabold">Success!</h1>
          </div>
          <p className="text-s m-4">{successMessage}</p>
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
