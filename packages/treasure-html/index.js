const { DOMParser, XMLSerializer } = require('xmldom')
const {
  formatDate,
  getFlagBase64,
  getIconByName,
  getIconByPoints,
} = require('./helpers')

const htmlString = require('./card.js')

const treasureBackgroundBase64 = require('./assets/treasureBackground')

const serializer = new XMLSerializer()
const parser = new DOMParser()

const getOrderedUsers = (treasure) => {
  const blackUser = {
    imageSrc: treasure.black.imageSrc,
    username: treasure.blackUsername,
    rating: treasure.blackRating,
    masterTitle: treasure.blackMasterTitle,
    flagImageSrc: getFlagBase64(treasure.black.country),
  }
  const whiteUser = {
    imageSrc: treasure.white.imageSrc,
    username: treasure.whiteUsername,
    rating: treasure.whiteRating,
    masterTitle: treasure.whiteMasterTitle,
    flagImageSrc: getFlagBase64(treasure.white.country),
  }
  topUser = blackUser
  bottomUser = whiteUser
  if (treasure.cardColor === 'black') {
    topUser = whiteUser
    bottomUser = blackUser
  }
  return { bottomUser, topUser }
}

// Pass gifData to get the final HTML to pin to IPFS
// OR pass gifUrl to fetch a smaller HTML file for the Frontend
// gifUrl version should load faster, b/c it delays fetching the gif
const getCard = ({ treasure, gifData, gifUrl }) => {
  const doc = parser.parseFromString(htmlString, 'text/html')

  const updateContent = (id, content) => {
    const element = doc.getElementById(id)
    if (!element) return console.log(`No element with id ${id}`)
    if (content === undefined) {
      const parent = element.parentNode
      return parent.removeChild(element)
    }
    let node = content
    if (typeof node == 'string' || typeof node == 'number')
      node = doc.createTextNode(content)
    element.replaceChild(node, element.childNodes[0])
  }
  const updateTag = (id, tag, content) => {
    const element = doc.getElementById(id)
    if (!element) return console.log(`No element with id ${id}`)
    element.setAttribute(tag, content)
  }

  // Card color
  if (treasure.cardColor === 'black') {
    updateTag(
      'container',
      'style',
      'color: white; width: 258px; border-radius: 12px; background-color: #272522; display: flex; flex-direction: column; padding: 4px;'
    )
    updateTag(
      'match-anchor',
      'style',
      'margin: 0; text-decoration: none; color:white'
    )
    updateTag(
      'top-username-anchor',
      'style',
      'text-decoration: none; color:white'
    )
    updateTag(
      'bottom-username-anchor',
      'style',
      'text-decoration: none; color:white'
    )
  }

  // Header
  updateContent('title', treasure.title)
  updateContent('termination', treasure.termination)
  // TODO: Update header color
  // TODO: Update icon color
  // TODO: Add TC logo below header

  // Users
  const { bottomUser, topUser } = getOrderedUsers(treasure)
  Object.keys(topUser).map((key) => updateContent(`top-${key}`, topUser[key]))
  Object.keys(bottomUser).map((key) =>
    updateContent(`bottom-${key}`, bottomUser[key])
  )
  updateTag(
    'top-username-anchor',
    'href',
    `https://www.chess.com/member/${topUser.username}`
  )
  updateTag('top-avatar', 'src', topUser.imageSrc)
  updateTag('bottom-avatar', 'src', bottomUser.imageSrc)
  updateTag('top-flag', 'src', topUser.flagImageSrc)
  updateTag('bottom-flag', 'src', bottomUser.flagImageSrc)

  // Game GIF / Final positions
  updateTag(
    'game-image',
    'src',
    (gifData && `data:image/gif;base64,${gifData}`) || gifUrl
  )
  // TODO: Replace treasureBackgroundBase64 with final positions image
  const staticImageUrl = `data:image/png;base64,${treasureBackgroundBase64}`
  updateTag(
    'game-image',
    'style',
    `position: relative; width: 100%; border-radius: 2px; background-repeat: no-repeat; background-image: url('${staticImageUrl}');`
  )
  updateTag('game-anchor', 'href', treasure.externalUrl)

  // Achievements
  // TODO: update all the icon colors if card is black
  updateContent('metadata-ruleVariant', treasure.ruleVariant)
  updateContent('metadata-timeControl', treasure.timeControl)

  // Footer
  updateContent(
    'match-anchor',
    `Match #${treasure.externalUrl.split('/').pop()}`
  )
  updateTag('match-anchor', 'href', treasure.externalUrl)
  updateContent('date', formatDate(treasure.endTime))

  let finalString = serializer.serializeToString(doc)
  if (treasure.cardColor === 'black')
    finalString.replace('fill="black"', 'fill="white"')
  console.log(finalString.indexOf('fill="black"'))
  return finalString
}

module.exports = getCard

// To test, uncomment and run "node index"
const test = () => {
  let [treasure] = require('../../scripts/seed/treasure')
  const members = require('../../scripts/seed/member')
  const white = members.find(
    (member) => member.username === treasure.whiteUsername
  )
  const black = members.find(
    (member) => member.username === treasure.blackUsername
  )
  treasure.blackRatingDelta
  treasure.white = white
  treasure.black = black
  const html = getCard({
    treasure,
    gifUrl: 'https://i.imgur.com/OQCBrle.gif',
  })
  const fs = require('fs')
  fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
}
test()
