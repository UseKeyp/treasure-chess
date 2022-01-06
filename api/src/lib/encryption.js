const { createDecipheriv } = require('crypto')
const { Buffer } = require('buffer')

const ALGORITHM = 'aes-256-cbc'

const decrypt = (ciphertext) => {
  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))

  let decrypted = decipher.update(ciphertext, 'hex')
  decrypted += decipher.final('hex')
  return decrypted
}

module.exports = { decrypt }
