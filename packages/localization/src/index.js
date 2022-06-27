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
  { id: 'de', region: 'DE', value: 'Deutsch', locale: 'de-DE' },
  { id: 'en', region: 'US', value: 'English', locale: 'en-US' },
  { id: 'es', region: 'ES', value: 'Español', locale: 'es-ES' },
  { id: 'fr', region: 'FR', value: 'Français', locale: 'fr-FR' },
  { id: 'pt', region: 'PT', value: 'Português', locale: 'pt-PT' },
  { id: 'vi', region: 'VI', value: 'Tiếng Việt', locale: 'vi-VI' },
  // { id: 'ja', region: 'JP', value: '日本語' },
  // { id: 'ru', region: 'RU', value: 'Pусский' },
  // value in Devanagari or in International Alphabet of Sanskrit Transliteration
  // { id: "hi", region: "IN", value: "मानक हिन्दी" },
  // // HK or China?
  // { id: "zh", region: "HANS-HK", value: "中文" },
  // // Which region
]

module.exports = { languageData, resources }
