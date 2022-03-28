import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
function getDefaults() {
  return {
    order: [
      'querystring',
      'cookie',
      'localStorage',
      'sessionStorage',
      'navigator',
      'htmlTag',
    ],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',

    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
    //cookieMinutes: 10,
    //cookieDomain: 'myDomain'
  }
}

i18next.use(LanguageDetector).init(getDefaults())
