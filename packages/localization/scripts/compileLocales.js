const fs = require('fs-extra')

console.log('====================')
console.log('Compiling Locales...')

fs.copySync('../../web/src/i18n/locales/en', './src/locales/en')
console.log('Imported locales from web')
