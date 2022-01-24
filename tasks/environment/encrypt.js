const fs = require('fs')
const path = require('path')
const { decrypt, encrypt } = require('./cryptography')

const directoryPath = path.join(__dirname, '../../')
const testDecryption = require('./testDecryption')

const ENVIRONMENT_LIST = ['dev', 'sandbox', 'staging', 'prod']

const main = () => {
  ENVIRONMENT_LIST.map((environment) => {
    console.log(`\n######## ${environment} ########`)
    const gitRevision = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim()
    const dateString = new Date().toString()

    let plaintext = require(path.join(directoryPath, `.env.${environment}.js`))
    plaintext = JSON.stringify(plaintext)

    const ciphertext = encrypt(plaintext)

    const encContents = `// Generated ${dateString}
// Git revision ${gitRevision}
const secret = "${ciphertext}";
module.exports = secret`

    fs.writeFileSync(
      path.join(directoryPath, `.env.${environment}.js.enc`),
      encContents
    )
    console.log(`✅ Encrypted .env.${environment}.js.enc`)

    testDecryption(environment)
  })
}

main()
