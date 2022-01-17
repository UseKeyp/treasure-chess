const { randomBytes } = require('crypto')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

const gen = () => {
  const gitRevision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString()
    .trim()
  const dateString = new Date().toString()

  const iv = randomBytes(16)

  fs.appendFileSync(
    path.join(directoryPath, '.env'),
    `# Generated ${dateString}
# Git revision ${gitRevision}

# NOTE: Any additions here must also be added to /scripts/encryptEnv/generateKey.js

ENCRYPTION_KEY=${process.env.ENCRYPTION_KEY}
ENCRYPTION_IV=${iv.toString('hex')}`,
    (err) => {
      if (err) throw err
    }
  )
  console.log('\n✅ Updated .env')
}

gen()
