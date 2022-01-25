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
  console.log(`\nDecrypting .env.${environment}.js.enc`)
  var startTime = performance.now()

  let encrypted = require(path.join(
    directoryPath,
    `.env.${environment}.js.enc`
  ))

  const decrypted = decrypt(encrypted)

  try {
    const parsed = JSON.parse(decrypted)
    // console.log(parsed)
    console.log('✅ SUCCESS')
  } catch (e) {
    console.log('❌ FAILED')
  }
  var endTime = performance.now()
  console.log(`(Duration: ${(endTime - startTime).toFixed(2)} ms)`)
}

module.exports = testDecryption
