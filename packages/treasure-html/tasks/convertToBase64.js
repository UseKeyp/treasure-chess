const fs = require('fs')
const path = require('path')

// Convert a single file to Base64
// cd to this folder and run `node convertToBase64.js`

const getBase64 = (filename) => {
  const data = fs.readFileSync(filename)
  let base64Image = new Buffer(data, 'binary').toString('base64')
  const codeSnippet = `const base64Image = "${base64Image}"
module.exports = base64Image`
  fs.writeFile(
    `${filename.split('.')[0]}.js`,
    codeSnippet,
    (e) => e && console.log(e)
  )
}

const filePath = path.join(__dirname, '.convertme.png')
getBase64(filePath)
