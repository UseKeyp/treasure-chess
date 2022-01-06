const path = require('path')
const { performance } = require('perf_hooks')
const dotenv = require('dotenv')

const { decrypt } = require(path.join(
  __dirname,
  '../../api/src/lib/encryption'
))

dotenv.config()

const directoryPath = path.join(__dirname, '../../')

const main = () => {
  console.log('\nTesting decryption...')
  var startTime = performance.now()

  let ciphertext = require(path.join(directoryPath, 'api/src/dev.env.enc.js'))

  const decrypted = decrypt(ciphertext)

  console.log('If successful, the next line should be readable:')
  console.log(decrypted)
  var endTime = performance.now()
  console.log(`Duration: ${(endTime - startTime).toFixed(2)} ms`)
}

main()
