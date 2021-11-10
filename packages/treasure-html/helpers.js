const fs = require('fs')
const icons = require('./assets/icons')

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

const changeToWhite = (svgString) =>
  svgString.replace(/fill="black"/, 'fill="white"')

const getIconByPoints = ({ points, color }) => {
  let icon = pawn
  if (points == 2) icon = knight
  if (points == 3) icon = bishop
  if (points == 4) icon = rook
  if (points == 5) icon = queen
  if (color === 'black') return changeToWhite(icon)
  return icon
}

const getIconByName = ({ name, color }) => {
  const icon = icons[name]
  if (!icon) throw `No icon found for "${name}"`
  if (color === 'black') return changeToWhite(icon)
  return icon
}

module.exports = { formatDate, getFlagBase64, getIconByPoints, getIconByName }
