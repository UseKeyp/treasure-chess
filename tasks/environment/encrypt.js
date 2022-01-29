const fs = require('fs')
const path = require('path')
const { decrypt, encrypt } = require('./cryptography')
const dotenv = require('dotenv')
const { performance } = require('perf_hooks')

const directoryPath = path.join(__dirname, '../../')

// WARNING: DO NOT CHANGE THESE
const ENVIRONMENT_LIST = [
  { environment: 'dev', key: process.env.DEV_ENCRYPTION_KEY },
  { environment: 'sandbox', key: process.env.DEV_ENCRYPTION_KEY },
  { environment: 'staging', key: process.env.STAGING_ENCRYPTION_KEY },
  { environment: 'prod', key: process.env.PROD_ENCRYPTION_KEY },
]

const testDecryption = ({ environment, key }) => {
  console.log(`\nDecrypting .env.${environment}.js.enc`)
  var startTime = performance.now()

  let encrypted = require(path.join(
    directoryPath,
    `.env.${environment}.js.enc`
  ))

  const decrypted = decrypt({ encrypted, key })

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

const main = () => {
  ENVIRONMENT_LIST.map(({ environment, key }) => {
    console.log(`\n######## ${environment} ########`)
    console.log(`\nEncrypting .env.${environment}.js.enc`)
    const gitRevision = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim()
    const dateString = new Date().toString()

    let plaintext = require(path.join(directoryPath, `.env.${environment}.js`))
    plaintext = JSON.stringify(plaintext)

    const encrypted = encrypt({ plaintext, key })

    const encContents = `// Generated ${dateString}
// Git revision ${gitRevision}
const content = "${encrypted.content}";
const tag = "${encrypted.tag}";
const iv = "${encrypted.iv}";
module.exports.content = content
module.exports.tag = tag
module.exports.iv = iv
`

    fs.writeFileSync(
      path.join(directoryPath, `.env.${environment}.js.enc`),
      encContents
    )
    console.log(`✅ SUCCESS`)

    testDecryption({ environment, key })
  })
}

main()
