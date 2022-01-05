const { randomFill, createCipheriv } = require('crypto')
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

const main = async () => {
  await rl.question(
    `Please enter your encryption key.\nYou can create one with: 'openssl rand -base64 128'\n`,
    async (key) => {
      if (!key || key.length > 100) {
        const gitRevision = require('child_process')
          .execSync('git rev-parse HEAD')
          .toString()
          .trim()
        const dateString = new Date().toString()

        await fs.writeFile(
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

        randomFill(new Uint8Array(16), async (err, iv) => {
          const algorithm = 'aes256'
          const cipher = createCipheriv(algorithm, key, iv)
          let encrypted = cipher.update(plaintext, 'utf8', 'hex')
          console.log(encrypted)
          encrypted += cipher.final('hex')
          console.log(encrypted)

          await fs.writeFile(
            path.join(directoryPath, 'secrets.enc.js'),
            `// Generated ${dateString}
// Git revision ${gitRevision}
module.exports = { secret: "${encrypted}"}`,
            (err) => {
              if (err) throw err
            }
          )
        })

        console.log('Updated .env.enc.js with')
        console.log('Done!')
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
