import { default as i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { languageData, resources } from '@treasure-chess/localization'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['web'],
    debug: process.env.ENVIRONMENT === 'local',
    whitelist: languageData.map((language) => language.id),
    returnEmptyString: false,
    // saveMissing: true, // send not translated keys to endpoint
    // backend: {
    //   loadPath:
    //     '@treasure-chess/packages/localization/src/locales/{{lng}}/{{ns}}.json',
    //   // addPath: "http://localhost:3000/locales/add/{{lng}}/{{ns}}.missing.json",
    // },
    load: 'languageOnly',
    react: { useSuspense: false },
  })
