const path = require('path')
const directoryPath = path.join(__dirname, '../../')
const dotenv = require('dotenv')
const { decrypt } = require('./cryptography')

dotenv.config()

// Usage example: node tasks/environment/setupEnv.js staging

const arg = process.argv[2]
let environment = arg ? arg : process.env.ENVIRONMENT
if (!environment || environment === 'local') environment = 'dev'

const setupEnvironment = () => {
  const encrypted = require(path.join(
    directoryPath,
    `./.env.${environment}.js.enc`
  ))
  let decrypted
  let env
  const key =
    process.env[`${environment.toUpperCase()}_ENCRYPTION_KEY`] ||
    process.env.ENCRYPTION_KEY
  try {
    decrypted = decrypt({ encrypted, key })
  } catch (e) {
    return console.log(
      `Decryption failed! Check encryption key\nNODE_ENV: ${environment}\nkey: ${key.substring(
        0,
        3
      )}...`
    )
  }
  env = JSON.parse(decrypted)

  Object.keys(env).map((key) => {
    if (process.env[key]) return // Allows overriding
    console.log(`export ${key}=${env[key]}`)
  })
}

setupEnvironment()
