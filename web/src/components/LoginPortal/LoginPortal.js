import { useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'
import { useToast } from 'src/providers/toast'
import { saveRedirectTo } from 'src/utils/auth/helpers'
import Button from 'src/components/Button'

import globalConfig from 'src/global.config.js'

const LoginPortal = () => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()
  const { error, redirectTo } = useParams()
  const { toast } = useToast()
  const [errorText, setErrorText] = React.useState('')
  const getErrorText = (error) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }

  const onSubmitSignUp = async (type) => {
    const response = await signUp({ type })
    if (response.url) {
      window.location = response.url
    } else {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    if (redirectTo) {
      saveRedirectTo(redirectTo) && reauthenticate()
    }
  }, [redirectTo, reauthenticate])

  useEffect(() => {
    if (error) setErrorText(getErrorText(error))
  }, [error])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  return (
    <div className="flex justify-center">
      <div className="login-portal-container w-80 sm:w-96">
        <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block xl:inline">{t('Sign In')}</span>
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <h3 className="text-base font-bold color-grey-light text-center">
              {t('Create a Treasure Chess wallet')}
            </h3>
          </div>
        </div>

        <div className="login-portal-container--button-wrapper">
          <Button
            onClick={() => onSubmitSignUp('CHESS')}
            variant="white"
            textColor="black"
            className="login-button"
            size="small"
          >
            <div className="flex justify-center align-center items-center m-1">
              <img src="/icons/chess.png" alt="chess" className="icon-logo" />
              <span className="mr-2">{t('Sign in with Chess.com')}</span>
            </div>
          </Button>
          {errorText && <div className="mt-2 rw-cell-error">{errorText}</div>}
        </div>
        <div className="w-full text-center">
          <ul className="ml-6 ">
            <li>
              <h4 className="-indent-6">
                <span className="mr-2">🔐</span>
                {t('Store funds')}
              </h4>
            </li>
            <li>
              <h4 className="-indent-6">
                <span className="mr-2">🪂</span>
                {t('Send and receive')}
              </h4>
              <li>
                <h4 className="-indent-6">
                  <span className="mr-2">🎁</span>
                  {t('Make purchases')}
                </h4>
              </li>
            </li>
          </ul>
        </div>
        <h4 className="mt-6">
          <a className="mr-2 text-blue" href={globalConfig.TOC_URL}>
            Terms of Service
          </a>
          ·
          <a className="ml-2 text-blue" href={globalConfig.PRIVACY_POLICY_URL}>
            Privacy Policy
          </a>
        </h4>
      </div>
    </div>
  )
}

export default LoginPortal
