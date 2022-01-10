const path = require('path')
const directoryPath = path.join(__dirname, '../../')
const dotenv = require('dotenv')

const { decrypt } = require('./cryptography')

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

const setupEnvironment = () => {
  const { performance } = require('perf_hooks')
  var startTime = performance.now()

  const ciphertext = isProduction
    ? require(path.join(directoryPath, './prod.env.enc'))
    : require(path.join(directoryPath, './dev.env.enc'))

  const decrypted = decrypt(ciphertext)
  const env = JSON.parse(decrypted)
  Object.keys(env).map((key) => {
    if (process.env[key]) return
    process.env[key] = env[key]
  })

  var endTime = performance.now()
  console.log(`Duration: ${(endTime - startTime).toFixed(2)} ms`)
}

setupEnvironment()
