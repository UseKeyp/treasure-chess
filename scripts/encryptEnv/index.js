const {
  randomFillSync,
  randomFill,
  createCipheriv,
  randomBytes,
} = require('crypto')
const { Buffer } = require('buffer')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const directoryPath = path.join(__dirname, '../../')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('close', function () {
  console.log('\nExiting!')
  process.exit(0)
})

const main = () => {
  rl.question(
    `Please enter your encryption key.\nYou can create one with: 'openssl rand -base64 24'\n`,
    (key) => {
      if (!key || key.length > 24) {
        console.log('Key length: ', key.length)
        const gitRevision = require('child_process')
          .execSync('git rev-parse HEAD')
          .toString()
          .trim()
        const dateString = new Date().toString()

        fs.writeFileSync(
          path.join(directoryPath, '.env'),
          `# Generated ${dateString}
# Git revision ${gitRevision}
SECRET_KEY=${key}`,
          (err) => {
            if (err) throw err
          }
        )
        console.log('Updated .env with new key')

        let plainText = require('../../.env.js')
        plainText = JSON.stringify(plainText)

        let iv = randomBytes(16)
        const algorithm = 'aes-256-cbc'
        const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
        let encrypted = cipher.update(plainText, 'utf8', 'hex')
        encrypted += cipher.final('hex')

        fs.writeFileSync(
          path.join(directoryPath, 'env.enc.js'),
          `// Generated ${dateString}
// Git revision ${gitRevision}
const secret = "${encrypted}";
module.exports = secret`,
          (err) => {
            console.log('Updated .env.enc.js with')
            if (err) throw err
          }
        )
        rl.close()
      } else {
        console.log('Key not long enough')
        rl.close()
      }
    }
  )
}

// module.exports = main

main()
// export default (req, res) => {
//   const algorithm = 'aes-128-cbc';
//   const decipher = crypto.createDecipheriv(
//     algorithm,
//     process.env.SERVICE_ENCRYPTION_KEY,
//     process.env.SERVICE_ENCRYPTION_IV
//   );
//   let decrypted = decipher.update(req.body.data, 'base64', 'utf8');
//   decrypted += decipher.final('utf8');
//   res.status(200).json(JSON.parse(decrypted))
// }
