import { useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'
import { useToast } from 'src/providers/toast'

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
      reauthenticate()
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
              {t('Create a Treasure Chess account')}
            </h3>
          </div>
          <ul className="ml-6">
            <li>
              <h4 className="-indent-6 ">
                <span className="mr-2">✨</span>
                {t('Mint new Treasures')}
              </h4>
            </li>
            <li>
              <h4 className="-indent-6 ">
                <span className="mr-2">❤️</span>
                {t('Collect Treasures from your favorite players')}
              </h4>
            </li>
            <li>
              <h4 className="-indent-6 ">
                <span className="mr-2">🎁</span>
                {t('Treasures you appear in can be sold in the Marketplace')}
              </h4>
            </li>
          </ul>
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
        </div>
        {errorText && <div className="mt-8 rw-cell-error">{errorText}</div>}
        <Trans i18nKey="web:userAgreement">
          <h4>
            By continuing you acknowledge that you have read, understand, and
            agree to the
            <a className="text-blue" href={globalConfig.TOC_URL}>
              Terms of Service
            </a>
            and
            <a className="text-blue" href={globalConfig.PRIVACY_POLICY_URL}>
              Privacy Policy
            </a>
            .
          </h4>
        </Trans>
        <Trans i18nKey="web:userAgreement2">
          <h4 className="mt-4">
            If you have any questions or concerns, please let us know using the
            <a
              className="text-blue"
              rel="noreferrer"
              target="_blank"
              href="/feedback"
            >
              Feedback Form
            </a>
            .
          </h4>
        </Trans>
      </div>
    </div>
  )
}

export default LoginPortal
