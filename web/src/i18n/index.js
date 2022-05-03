import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { languageData } from '@treasure-chess/localization'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['web'],
    debug: process.env.ENVIRONMENT === 'local',
    whitelist: languageData.map((language) => language.id),
    returnEmptyString: false,
    // saveMissing: true, // send not translated keys to endpoint
    backend: {
      loadPath: 'web/src/i18n/locales/{{lng}}/{{ns}}.json',
      // addPath: "http://localhost:3000/locales/add/{{lng}}/{{ns}}.missing.json",
    },
    load: 'languageOnly',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  })
