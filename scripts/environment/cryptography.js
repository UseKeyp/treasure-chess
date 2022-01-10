const { createDecipheriv, createCipheriv, randomBytes } = require('crypto')

const { Buffer } = require('buffer')

const dotenv = require('dotenv')
dotenv.config()

const ALGORITHM = 'aes-256-cbc'

const decrypt = (ciphertext) => {
  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))

  let decrypted = decipher.update(ciphertext, 'hex')
  decrypted += decipher.final('hex')
  return decrypted
}

const encrypt = (plaintext) => {
  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV
  if (!key || key.length < 24 || !iv) throw new Error('Missing key or iv')
  const cipher = createCipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))

  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

module.exports = { decrypt, encrypt }
