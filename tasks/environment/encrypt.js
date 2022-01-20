const fs = require('fs')
const path = require('path')
const { decrypt, encrypt } = require('./cryptography')

const directoryPath = path.join(__dirname, '../../')

// Change me!
// const ENVIRONMENT = 'dev'
const ENVIRONMENT = 'prod'

const main = () => {
  const gitRevision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
  const dateString = new Date().toString()

  let plaintext = require(path.join(directoryPath, `.env.${ENVIRONMENT}.js`))
  plaintext = JSON.stringify(plaintext)

  const ciphertext = encrypt(plaintext)

  const encContents = `// Generated ${dateString}
// Git revision ${gitRevision}
const secret = "${ciphertext}";
module.exports = secret`

  fs.writeFileSync(
    path.join(directoryPath, `${ENVIRONMENT}.env.enc.js`),
    encContents
  )
  console.log(`✅ Updated ${ENVIRONMENT}.env.enc.js`)
}

main()
