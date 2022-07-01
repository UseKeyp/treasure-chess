const de = require('./locales/de/web')
const en = require('./locales/en/web')
const es = require('./locales/es/web')
const pt = require('./locales/pt/web')
const fr = require('./locales/fr/web')
const vi = require('./locales/vi/web')

const resources = {
  de: { web: de },
  en: { web: en },
  es: { web: es },
  pt: { web: pt },
  fr: { web: fr },
  vi: { web: vi },
}

const languageData = [
  { id: 'de', region: 'DE', value: 'Deutsch' },
  { id: 'en', region: 'US', value: 'English' },
  { id: 'es', region: 'ES', value: 'Español' },
  { id: 'fr', region: 'FR', value: 'Français' },
  { id: 'pt', region: 'PT', value: 'Português' },
  { id: 'vi', region: 'VI', value: 'Tiếng Việt' },
  // { id: 'ja', region: 'JP', value: '日本語' },
  // { id: 'ru', region: 'RU', value: 'Pусский' },
  // value in Devanagari or in International Alphabet of Sanskrit Transliteration
  // { id: "hi", region: "IN", value: "मानक हिन्दी" },
  // // HK or China?
  // { id: "zh", region: "HANS-HK", value: "中文" },
  // // Which region
]

module.exports = { languageData, resources }
