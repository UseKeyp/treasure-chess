import { useMutation } from '@redwoodjs/web'
import { USER_LOCALE_MUTATION } from './graphql'

const LocaleContext = React.createContext({})
const LOCALE_LOCAL_KEY = 'i18nextLng'
const getLocaleCode = () => {
  return localStorage.getItem(LOCALE_LOCAL_KEY)
}

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = React.useState(getLocaleCode())
  const [userLocale] = useMutation(USER_LOCALE_MUTATION)

  const updateLocale = async () => {
    try {
      await userLocale({
        variables: {
          locale,
        },
        fetchPolicy: 'network-only',
      })
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error(e)
    }
  }

  React.useEffect(() => {
    if (!locale) return
    updateLocale()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [locale])

  return (
    <LocaleContext.Provider
      value={{
        locale: locale,
        setLocale: setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

const useLocale = () => React.useContext(LocaleContext)

export { LocaleProvider, useLocale }
