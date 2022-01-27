const fs = require('fs')
const path = require('path')
const { decrypt, encrypt } = require('./cryptography')

const directoryPath = path.join(__dirname, '../../')
const testDecryption = require('./testDecryption')

const ENVIRONMENT_LIST = ['dev', 'sandbox', 'staging', 'prod']

const main = () => {
  ENVIRONMENT_LIST.map((environment) => {
    console.log(`\n######## ${environment} ########`)
    console.log(`\nEncrypting .env.${environment}.js.enc`)
    const gitRevision = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim()
    const dateString = new Date().toString()

    let plaintext = require(path.join(directoryPath, `.env.${environment}.js`))
    plaintext = JSON.stringify(plaintext)

    const encrypted = encrypt(plaintext)

    const encContents = `// Generated ${dateString}
// Git revision ${gitRevision}
const content = "${encrypted.content}";
const tag = "${encrypted.tag}";
const iv = "${encrypted.iv}";
module.exports.content = content
module.exports.tag = tag
module.exports.iv = iv`

    fs.writeFileSync(
      path.join(directoryPath, `.env.${environment}.js.enc`),
      encContents
    )
    console.log(`✅ SUCCESS`)

    testDecryption(environment)
  })
}

main()
