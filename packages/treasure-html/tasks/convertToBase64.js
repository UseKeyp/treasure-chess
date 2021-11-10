const fs = require('fs')

// Replace with your file and run `node convertToBase64.js`
const filename = '../assets/bannerLogo'

const getBase64 = () => {
  const data = fs.readFileSync(`${filename}.png`)
  let base64Image = new Buffer(data, 'binary').toString('base64')
  const codeSnippet = `const base64Image = "${base64Image}"
module.exports = base64Image`
  fs.writeFile(`${filename}.js`, codeSnippet, (e) => e && console.log(e))
}
getBase64()
