const fs = require('fs')

// Helper function to convert a png to base64
const getBase64 = () => {
  // Replace with your file
  const filename = '../assets/treasure-image-background'
  const data = fs.readFileSync(`${filename}.png`)
  let base64Image = new Buffer(data, 'binary').toString('base64')
  const codeSnippet = `const base64Image = "${base64Image}"
module.exports = base64Image`
  fs.writeFile(`${filename}.js`, codeSnippet, (e) => e && console.log(e))
}
getBase64()
