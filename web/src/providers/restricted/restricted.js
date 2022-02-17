import { navigate } from '@redwoodjs/router'

const LOCAL_BASIC_AUTH_KEY = 'basic_auth'

const passedBasicAuth = () => {
  // if (!['development', 'dev', 'sandbox'].includes(process.env.NODE_ENV)) return true
  if (!process.env.BASIC_AUTH_PASSWORD) return true
  return (
    localStorage.getItem(LOCAL_BASIC_AUTH_KEY) ===
    process.env.BASIC_AUTH_PASSWORD
  )
}

const RestrictedContext = React.createContext({
  passed: passedBasicAuth(),
  status: '',
})

const RestrictedProvider = ({ children }) => {
  const [state, setState] = React.useState({
    passed: passedBasicAuth(),
    status: '',
  })
  const { status, passed } = state

  const submitPassword = (password) => {
    if (password === process.env.BASIC_AUTH_PASSWORD) {
      localStorage.setItem(LOCAL_BASIC_AUTH_KEY, password)
      setState({ passed: true })
      navigate('/')
    } else {
      setState({ status: 'Incorrect password' })
    }
  }

  React.useEffect(() => {
    if (!passed) navigate('/restricted')
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [])

  return (
    <RestrictedContext.Provider
      value={{
        passed,
        submitPassword,
        status,
      }}
    >
      {children}
    </RestrictedContext.Provider>
  )
}

const useRestricted = () => React.useContext(RestrictedContext)

export { RestrictedProvider, useRestricted }
