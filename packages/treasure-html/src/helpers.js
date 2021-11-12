const fs = require('fs')
const icons = require('./assets/icons')
const path = require('path')
const fetch = require('cross-fetch')

const fetchImageAndEncodeBase64 = async (url) => {
  const result = await fetch(url, {
    headers: {
      // Required to prevent rate-limiting
      Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
    },
  })
  if (result.status !== 200) throw "Couldn't get avatar"
  let base64Image = await result.buffer()
  base64Image = base64Image.toString('base64')
  return `data:image/png;base64,${base64Image}`
}

const getFlagBase64 = (code) => {
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const filePath = path.join(
    __dirname,
    `./assets/flags/24/${regionNames.of(code)}.png`
  )
  const data = fs.readFileSync(filePath)
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
  svgString.replace(/fill="black"/g, 'fill="white"')

const iconByPoints = (points, color) => {
  let icon = icons['pawn']
  if (points == 2) icon = icons['knight']
  if (points == 3) icon = icons['rook']
  if (points == 4) icon = icons['queen']
  if (points == 5) icon = icons['king']
  if (color === 'black') icon = changeToWhite(icon)
  return icon
}

const iconByName = (name, color) => {
  let icon = icons[name]
  if (!icon) throw `No icon found for "${name}"`
  if (color === 'black') icon = changeToWhite(icon)
  return icon
}

function formatXml(xml, tab) {
  // tab = optional indent value, default is tab (\t)
  var formatted = '',
    indent = ''
  tab = tab || '\t'
  xml.split(/>\s*</).forEach(function (node) {
    if (node.match(/^\/\w/)) indent = indent.substring(tab.length) // decrease indent by one 'tab'
    formatted += indent + '<' + node + '>\r\n'
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab // increase indent
  })
  return formatted.substring(1, formatted.length - 3)
}

const getRarityColor = (points) => {
  if (points < 6) return '#ABB6B9'
  if (points < 11) return '#88C54B'
  if (points < 14) return '#47A7FF'
  return '#FFBB0D'
}

module.exports = {
  formatDate,
  getFlagBase64,
  iconByPoints,
  iconByName,
  formatXml,
  getRarityColor,
  fetchImageAndEncodeBase64,
}
