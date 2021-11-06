const fs = require('fs')

const getFlagImageSrc = (code) => {
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  if (code === 'XX') {
    // TODO: show some flag?
    return ''
  }
  fs.readFile(`./flags/32/${regionNames.of(code)}.png`, (err, data) => {
    let base64Image = new Buffer(data, 'binary').toString('base64')
    return `data:image/png;base64,${base64Image}`
  })
  // TODO: Remove other flag sizes if we don't need them
}

module.exports = getFlagImageSrc
