const { createDecipheriv, createCipheriv, randomBytes } = require('crypto')
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const dotenv = require('dotenv')
const { ALGORITHM } = require('./constants')

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

const decrypt = () => {
  console.log('\nTesting decryption using .env...')

  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV

  let ciphertext = require(path.join(directoryPath, 'web/src/env.enc.js'))
  const decipher = createDecipheriv(
    ALGORITHM,
    process.env.ENCRYPTION_KEY,
    Buffer.from(iv, 'hex')
  )
  console.log(ciphertext)
  let decrypted = decipher.update(ciphertext, 'base64', 'utf8')
  decrypted += decipher.final('utf8')
  console.log(decrypted)
  // console.log(decrypted.slice(0, 30))
  console.log('✅ Decryption complete')
}

decrypt()
