const fs = require('fs')

// Asynchronous function
const getFlagBase64 = (code) => {
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  if (code === 'XX') {
    // TODO: show some flag?
    return ''
  }
  const data = fs.readFileSync(`./flags/32/${regionNames.of(code)}.png`)
  let base64Image = new Buffer(data, 'binary').toString('base64')
  return `data:image/png;base64,${base64Image}`
}

module.exports = getFlagBase64
