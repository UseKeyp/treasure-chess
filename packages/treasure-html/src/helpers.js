const fetch = require('cross-fetch')

const icons = require('./assets/icons')
const flags = require('./assets/flags')
const noAvatarBase64 = require('./assets/noAvatar')

export const fetchImageAndEncodeBase64 = async (url) => {
  // If no profile image, show the basic pawn
  if (!url || !url.length) return `data:image/png;base64,${noAvatarBase64}`
  if (url.startsWith('data:image')) return url
  if (typeof process !== 'undefined' && process?.release?.name === 'node') {
    // If node, we need the raw image data
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
  } else {
    // If browser, just load the image directly
    return url
  }
}

export const getFlagBase64 = (code) => {
  let base64Image = flags['International']
  if (code) {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const country = regionNames.of(code)
    if (flags[country.replaceAll(' ', '-')] !== undefined) {
      base64Image = flags[country.replaceAll(' ', '-')]
    }
  }
  return `data:image/png;base64,${base64Image}`
}

export const formatDate = (rawString) => {
  if (!rawString) return ''
  const date = new Date(rawString)
  let options = { month: 'short' }
  // TODO: Intl throws error in capacitor
  const month = new Intl.DateTimeFormat('en-US', options).format(date)
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day} ${year}`
}

const changeToWhite = (svgString) =>
  svgString.replace(/fill="black"/g, 'fill="white"')

export const iconByPoints = (points, color) => {
  let icon = icons['pawn']
  if (points == 2) icon = icons['knight']
  if (points == 3) icon = icons['rook']
  if (points == 4) icon = icons['queen']
  if (points == 5) icon = icons['king']
  if (color === 'black') icon = changeToWhite(icon)
  return icon
}

export const iconByName = (name, color) => {
  let icon = icons[name]
  if (!icon) throw `No icon found for "${name}"`
  if (color === 'black') icon = changeToWhite(icon)
  return icon
}

export const getRarityColor = (points) => {
  if (!points) return '#8a8886'
  if (points < 6) return '#8a8886'
  if (points < 11) return '#7ea650'
  if (points < 14) return '#c1a35a'
  return '#0096C6'
}

// Note: Unused, since it reduces performance enough to matter
export const formatXml = (xml, tab) => {
  // tab = optional indent value, default is tab (\t)
  var formatted = '',
    indent = ''
  tab = tab || '\t'
  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) indent = indent.substring(tab.length) // decrease indent by one 'tab'
    formatted += indent + '<' + node + '>\r\n'
    if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab // increase indent
  })
  return formatted.substring(1, formatted.length - 3)
}

export const getRatingText = (treasure, playerColor) => {
  const delta = treasure[`${playerColor}RatingDelta`]
  let text = delta > 0 ? `+${delta}` : delta
  let color = '#DA413E'
  if (treasure.outcome === playerColor) {
    color = '#88C54B'
  } else if (treasure.outcome === 'draw') {
    color = treasure.cardColor === 'black' ? 'white' : 'black'
    text = '0'
  }
  return { text, color }
}

export const getDescription = (treasure) =>
  `${treasure.white.username} and ${treasure.black.username}'s game from Chess.com is now a collectible.`
