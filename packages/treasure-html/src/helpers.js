const fetch = require('cross-fetch')

const icons = require('./assets/icons')
const flags = require('./assets/flags')
const noAvatarBase64 = require('./assets/noAvatar')

const fetchImageAndEncodeBase64 = async (url) => {
  if (!url || !url.length) return `data:image/png;base64,${noAvatarBase64}`
  // If browser, just load the image directly
  if (typeof window !== 'undefined') return url
  const result = await fetch(url, {
    headers: {
      // Required to prevent rate-limiting
      Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
    },
  })
  if (result.status !== 200) throw "Couldn't get avatar"
  const buffer = await result.buffer()
  const base64Image = buffer.toString('base64')
  return `data:image/jpeg;base64,${base64Image}`
}

const getFlagSrc = (code) => {
  let base64Image = flags['XX']
  if (code) {
    regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    base64Image = flags[regionNames.of(code)]
  }
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

const getRarityColor = (points) => {
  if (points < 6) return '#ABB6B9'
  if (points < 11) return '#88C54B'
  if (points < 14) return '#47A7FF'
  return '#FFBB0D'
}

// TODO:  This causes an error when included for some reason?
// const formatXml = (xml, tab) => {
//   // tab = optional indent value, default is tab (\t)
//   var formatted = '',
//     indent = ''
//   tab = tab || '\t'
//   xml.split(/>\s*</).forEach((node) => {
//     if (node.match(/^\/\w/)) indent = indent.substring(tab.length) // decrease indent by one 'tab'
//     formatted += indent + '<' + node + '>\r\n'
//     if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab // increase indent
//   })
//   return formatted.substring(1, formatted.length - 3)
// }

module.exports = {
  formatDate,
  getFlagSrc,
  iconByPoints,
  iconByName,
  getRarityColor,
  fetchImageAndEncodeBase64,
  // formatXml,
}
