const path = require('path')
const directoryPath = path.join(__dirname, '../../')
const dotenv = require('dotenv')
const { decrypt } = require('./cryptography')

dotenv.config()

const environment = process.env.NODE_ENV || 'dev'

const setupEnvironment = () => {
  const encrypted = require(path.join(
    directoryPath,
    `./.env.${environment}.js.enc`
  ))

  const decrypted = decrypt(encrypted)
  const env = JSON.parse(decrypted)

  Object.keys(env).map((key) => {
    if (process.env[key]) return // Allows overriding
    console.log(`export ${key}=${env[key]}`)
  })
}

setupEnvironment()
