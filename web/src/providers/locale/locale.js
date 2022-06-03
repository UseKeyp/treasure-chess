import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { USER_LOCALE_MUTATION } from './graphql'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

const LocaleContext = React.createContext({})
const LOCALE_LOCAL_KEY = 'i18nextLng'
import { useTranslation, Trans } from 'react-i18next'

const getLocaleCode = () => {
  if (!isBrowser) return // Support prerender
  return localStorage.getItem(LOCALE_LOCAL_KEY)
}

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = React.useState(getLocaleCode())
  const { currentUser } = useAuth()

  const { t } = useTranslation('web')

  /*global globalThis*/
  globalThis.t = t
  globalThis.Trans = Trans

  const [userLocale] = useMutation(USER_LOCALE_MUTATION)

  const updateLocale = async () => {
    try {
      await userLocale({
        variables: {
          locale,
        },
      })
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error(e)
    }
  }

  React.useEffect(() => {
    if (!locale || !currentUser) return
    if (locale !== currentUser?.locale) {
      updateLocale()
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [locale, currentUser])

  return (
    <LocaleContext.Provider
      value={{
        locale: locale,
        setLocale: setLocale,
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

const useLocale = () => React.useContext(LocaleContext)

export { LocaleProvider, useLocale }
