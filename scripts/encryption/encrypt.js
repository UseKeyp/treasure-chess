const { createDecipheriv, createCipheriv, randomBytes } = require('crypto')
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const ALGORITHM = 'aes-256-cbc'

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

const encrypt = () => {
  const gitRevision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
  const dateString = new Date().toString()

  let plainText = require(path.join(directoryPath, '.env.js'))
  plainText = JSON.stringify(plainText)
  console.log(plainText)
  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV
  if (!key || key.length < 24 || !iv) throw new Error('Missing key or iv')
  const cipher = createCipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))

  let encrypted = cipher.update(plainText, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const encContents = `// Generated ${dateString}
// Git revision ${gitRevision}
const secret = "${encrypted}";
module.exports = secret`

  fs.writeFileSync(
    path.join(directoryPath, 'api/src/dev.env.enc.js'),
    encContents
  )
  console.log('✅ Updated (prod|dev).env.enc.js')
}

encrypt()
