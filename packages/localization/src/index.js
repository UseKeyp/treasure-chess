const en = require('./locales/en/web')
const pt = require('./locales/pt/web')

const resources = {
  en: { web: en },
  pt: { web: pt },
}

const languageData = [
  { id: 'en', region: 'US', value: 'English' },
  { id: 'pt', region: 'PT', value: 'Português' },
  // { id: 'fr', region: 'FR', value: 'Français' },
  // { id: 'de', region: 'DE', value: 'Deutsch' },
  // { id: 'ja', region: 'JP', value: '日本語' },
  // { id: 'ru', region: 'RU', value: 'Pусский' },
  // value in Devanagari or in International Alphabet of Sanskrit Transliteration
  // { id: "hi", region: "IN", value: "मानक हिन्दी" },
  // // HK or China?
  // { id: "zh", region: "HANS-HK", value: "中文" },
  // // Which region
  // { id: "es", region: "ES", value: "Español" }
]

module.exports = { languageData, resources }
