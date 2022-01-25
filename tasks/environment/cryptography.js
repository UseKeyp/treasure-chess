const { createDecipheriv, createCipheriv, randomBytes } = require('crypto')

const { Buffer } = require('buffer')

const dotenv = require('dotenv')
dotenv.config()

const ALGORITHM = 'aes-256-gcm'

const decrypt = ({ tag, content, iv }) => {
  const key = process.env.ENCRYPTION_KEY
  if (!key || !iv) throw 'No ENCRYPTION_KEY or ENCRYPTION_IV found in .env'
  const decipher = createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(new Buffer(tag, 'hex'))

  let decrypted = decipher.update(content, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const encrypt = (plaintext) => {
  const key = process.env.ENCRYPTION_KEY
  const iv = process.env.ENCRYPTION_IV
  if (!key || key.length < 24 || !iv) throw new Error('Missing key or iv')
  const cipher = createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  var tag = cipher.getAuthTag()
  return { content: encrypted, tag: tag.toString('hex'), iv }
}

module.exports = { decrypt, encrypt }
