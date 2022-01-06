const { randomBytes } = require('crypto')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const dotenv = require('dotenv')

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

  fs.writeFileSync(
    path.join(directoryPath, '.env'),
    `# Generated ${dateString}
# Git revision ${gitRevision}

# NOTE: Any additions here must also be added to /scripts/encryptEnv/generateKey.js

ENCRYPTION_KEY=${key}
ENCRYPTION_IV=${iv.toString('hex')}
APP_DOMAIN=${process.env.APP_DOMAIN}
ETHEREUM_NETWORK_NAME=${process.env.ETHEREUM_NETWORK_NAME}`,
    (err) => {
      if (err) throw err
    }
  )
  console.log('\n✅ Updated .env')
  rl.close()
}

prompt(gen)
