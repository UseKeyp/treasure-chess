const fs = require('fs')

const getFlagBase64 = (code) => {
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  if (code === 'XX') {
    // TODO: show some flag?
    return ''
  }
  const data = fs.readFileSync(`./assets/flags/32/${regionNames.of(code)}.png`)
  let base64Image = new Buffer(data, 'binary').toString('base64')
  return `data:image/png;base64,${base64Image}`
}

const formatDate = (rawString) => {
  const date = new Date(rawString)
  let options = { month: 'short' }
  const month = new Intl.DateTimeFormat('en-US', options).format(date)
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day} ${year}`
}

module.exports = { formatDate, getFlagBase64 }
