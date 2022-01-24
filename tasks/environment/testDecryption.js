const path = require('path')
const { performance } = require('perf_hooks')

const dotenv = require('dotenv')

const { decrypt } = require('./cryptography')

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

// Change me!
const DEFAULT_ENVIRONMENT = 'dev'
// const DEFAULT_ENVIRONMENT = 'prod'

const testDecryption = (environment = DEFAULT_ENVIRONMENT) => {
  console.log(`\nTesting decryption for "${environment}"`)
  var startTime = performance.now()

  let ciphertext = require(path.join(
    directoryPath,
    `${environment}.env.enc.js`
  ))

  const decrypted = decrypt(ciphertext)

  console.log('If successful, the next line should be readable:')
  console.log(decrypted)
  var endTime = performance.now()
  console.log(`Duration: ${(endTime - startTime).toFixed(2)} ms`)
}

module.exports = testDecryption
