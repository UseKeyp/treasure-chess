import { default as i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { languageData } from '@treasure-chess/localization'
import enUS from '@treasure-chess/localization/src/locales/en/web.json'

const resources = {
  en: {
    translation: enUS,
  },
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['web'],
    debug: process.env.ENVIRONMENT === 'locals',
    whitelist: languageData.map((language) => language.id),
    returnEmptyString: false,
    // saveMissing: true, // send not translated keys to endpoint
    backend: {
      loadPath: 'web/public/locales/{{lng}}/{{ns}}.json',
      // addPath: "http://localhost:3000/locales/add/{{lng}}/{{ns}}.missing.json",
    },
    load: 'languageOnly',
    react: {
      useSuspense: false,
    },
  })
