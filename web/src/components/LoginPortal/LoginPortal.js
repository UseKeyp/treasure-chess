import { useEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { routes, navigate, useParams } from '@redwoodjs/router'
import { useToast } from 'src/providers/toast'

import Icon from 'src/components/Icon'
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
      <div className="login-portal-container">
        <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block xl:inline">Login</span>
        </h1>
        <h3 className="mt-8 text-center">
          Create a Treasure Chess wallet using your Chess account
        </h3>
        <div className="login-portal-container--button-wrapper">
          <Button
            onClick={() => onSubmitSignUp('CHESS')}
            variant="green"
            size="small"
          >
            <Icon size="30" name="chess_com" className="mr-4" />
          </Button>
        </div>
        {errorText && <div className="mt-8 rw-cell-error">{errorText}</div>}
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
  )
}

export default LoginPortal
