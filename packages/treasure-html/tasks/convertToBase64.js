const fs = require('fs')
const path = require('path')

// cd to this folder and run `node convertToBase64.js`

const getBase64 = (filename) => {
  const data = fs.readFileSync(filename)
  let base64Image = new Buffer(data, 'binary').toString('base64')
  const codeSnippet = `const base64Image = "${base64Image}"
module.exports = base64Image`
  fs.writeFile(`${filename}.js`, codeSnippet, (e) => e && console.log(e))
}
// getBase64('../assets/Armenia24')
module.exports = getBase64
