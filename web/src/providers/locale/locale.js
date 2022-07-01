import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { USER_LOCALE_MUTATION } from './graphql'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

const LocaleContext = React.createContext({})
const LOCALE_LOCAL_KEY = 'i18nextLng'
import { useTranslation, Trans } from 'react-i18next'
import { languageData } from '@treasure-chess/localization'
import { toast } from '@redwoodjs/web/toast'

const getLocaleCode = () => {
  if (!isBrowser) return // Support prerender
  return localStorage.getItem(LOCALE_LOCAL_KEY)
}

const getLanguageFromLocale = (localeCode) => {
  const matchedLanguage = languageData.find((item) => localeCode === item.id)
  if (matchedLanguage) {
    return matchedLanguage.value
  }
}

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = React.useState(getLocaleCode())
  const [localeError, setLocaleError] = React.useState('')
  const { currentUser } = useAuth()

  const { t } = useTranslation('web')

  /*global global*/
  global.t = t
  global.Trans = Trans

  const [userLocale] = useMutation(USER_LOCALE_MUTATION)

  const updateLocale = async () => {
    try {
      await userLocale({
        variables: {
          locale,
        },
      })
      toast.success(<div>{t('Changes Saved')}</div>)
      localStorage.setItem('i18nextLng', locale.toString())
      if (localeError) {
        setLocaleError('')
      }
    } catch (e) {
      setLocaleError(e.toString())
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
        localeError: localeError,
        setLocaleError: setLocaleError,
        localeLanguage: getLanguageFromLocale(locale),
        t,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

const useLocale = () => React.useContext(LocaleContext)

export { LocaleProvider, useLocale }
