const { webcrypto, KeyObject } = require('crypto')
const { createDecipheriv, createCipheriv, randomBytes } = require('crypto')
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const dotenv = require('dotenv')

const { ALGORITHM } = require('./constants')

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('close', function () {
  console.log('\nExiting!')
  process.exit(0)
})

const prompt = (cb) => {
  rl.question(
    `Please enter your encryption key.\nYou can create one with: 'openssl rand -base64 24'\n`,
    (answer) => cb(answer)
  )
}

const gen = (key) => {
  const gitRevision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
  const dateString = new Date().toString()

  const iv = randomBytes(16)

  // console.log(iv)
  // const ivString = iv.toString('hex')
  // let cipher = createCipheriv(ALGORITHM, process.env.ENCRYPTION_KEY, iv)
  // console.log(ivString)
  // const ivBuffer = Buffer.from(ivString, 'hex')
  // console.log(ivBuffer)
  // cipher = createCipheriv(ALGORITHM, process.env.ENCRYPTION_KEY, ivBuffer)
  // const decipher = createDecipheriv(
  //   ALGORITHM,
  //   process.env.ENCRYPTION_KEY,
  //   ivBuffer
  // )
  // console.log(decipher)

  fs.writeFileSync(
    path.join(directoryPath, '.env'),
    `# Generated ${dateString}
# Git revision ${gitRevision}
ENCRYPTION_KEY=${key}
ENCRYPTION_IV=${iv.toString('hex')}`,
    (err) => {
      if (err) throw err
    }
  )
  console.log('\n✅ Updated .env')
  rl.close()
  // const key = await subtle.generateKey(
  //   {
  //     name: 'HMAC',
  //     hash: 'SHA-256',
  //     length: 256,
  //   },
  //   true,
  //   ['sign', 'verify']
  // )
  //
  // const keyObject = KeyObject.from(key)
  // console.log(keyObject.symmetricKeySize)
}

prompt(gen)
