const { createDecipheriv, createCipheriv, randomBytes } = require('crypto')
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')
const { performance } = require('perf_hooks')
const readline = require('readline')
const dotenv = require('dotenv')
const { ALGORITHM } = require('./constants')

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

const decrypt = () => {
  console.log('\nTesting decryption...')
  var startTime = performance.now()

  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))

  let ciphertext = require(path.join(directoryPath, 'env.enc.js'))

  let decrypted = decipher.update(ciphertext, 'hex')
  decrypted += decipher.final('hex')

  console.log('If successful, the next line should be readable:')
  console.log(decrypted.slice(0, 100))
  var endTime = performance.now()
  console.log(`Duration: ${(endTime - startTime).toFixed(2)} ms`)
}

decrypt()
