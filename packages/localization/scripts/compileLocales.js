const fs = require('fs-extra')

console.log('====================')
console.log('Compiling Locales...')

fs.copySync('../../web/public/locales/', './src/locales/')
console.log('Imported locales from web')
