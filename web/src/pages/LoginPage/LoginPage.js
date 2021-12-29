import { routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import globalConfig from 'src/global.config.js'

const LoginPage = () => {
  const { logIn, isAuthenticated } = useAuth()
  const { error, redirectTo } = useParams()
  const [errorText, setErrorText] = React.useState('')

  const getErrorText = (error) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }
  React.useEffect(() => {
    if (error) setErrorText(getErrorText(error))
  }, [error])

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
      <div className=" text-left ">
        <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block xl:inline">Login</span>
        </h1>
        {errorText && <div className=" mt-8 rw-cell-error">{errorText}</div>}
        <Button onClick={() => logIn({ redirectTo })}>
          <Icon size="30" name="chess_com" className="mr-4" />
        </Button>
      </div>
      <p>
        By continuing you acknowledge that you have read, understand, and agree
        to the
        <a href={globalConfig.TOC_URL}>
          <span className="text-blue"> Terms of Service </span>
        </a>
        and
        <a href={globalConfig.PRIVACY_POLICY_URL}>
          <span className="text-blue"> Privacy Policy</span>
        </a>
        .
      </p>
    </div>
  )
}

export default LoginPage
