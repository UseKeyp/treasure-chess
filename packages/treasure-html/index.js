const { DOMParser, XMLSerializer } = require('xmldom')
const {
  formatDate,
  getFlagBase64,
  iconByName,
  iconByPoints,
  formatXml,
  getRarityColor,
} = require('./helpers')

const htmlString = require('./card.js')

const treasureBackgroundBase64 = require('./assets/treasureBackground')
const bannerLogoBase64 = require('./assets/bannerLogo')

const serializer = new XMLSerializer()
const parser = new DOMParser()

const getOrderedUsers = (treasure) => {
  let whiteRatingDeltaColor
  let blackRatingDeltaColor
  if (treasure.outcome === 'black') {
    whiteRatingDeltaColor = '#DA413E'
    blackRatingDeltaColor = '#88C54B'
  } else if (treasure.outcome === 'white') {
    whiteRatingDeltaColor = '#88C54B'
    blackRatingDeltaColor = '#DA413E'
  }
  const blackRatingDelta =
    treasure.blackRatingDelta > 0
      ? `+${treasure.blackRatingDelta}`
      : treasure.blackRatingDelta
  const whiteRatingDelta =
    treasure.whiteRatingDelta > 0
      ? `+${treasure.whiteRatingDelta}`
      : treasure.whiteRatingDelta
  const blackUser = {
    username: treasure.blackUsername,
    rating: treasure.blackRating,
    ratingDelta: blackRatingDelta,
    masterTitle: treasure.blackMasterTitle,
    // Not content, but rather "styles" and "src"
    ...(blackRatingDeltaColor && { ratingDeltaColor: blackRatingDeltaColor }),
    imageSrc: treasure.black.imageSrc,
    flagImageSrc: getFlagBase64(treasure.black.country),
  }
  const whiteUser = {
    username: treasure.whiteUsername,
    rating: treasure.whiteRating,
    ratingDelta: whiteRatingDelta,
    masterTitle: treasure.whiteMasterTitle,
    // Not content, but rather "styles" and "src"
    ...(whiteRatingDeltaColor && { ratingDeltaColor: whiteRatingDeltaColor }),
    imageSrc: treasure.white.imageSrc,
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

  const updateContent = (id, content, isNode) => {
    const element = doc.getElementById(id)
    if (!element) return console.log(`No element with id ${id}`)
    if (content === undefined) {
      const parent = element.parentNode
      return parent.removeChild(element)
    }
    let node = content
    if (isNode) {
      node = parser.parseFromString(content, 'text/html')
      element.replaceChild(node, element.childNodes[1])
    } else if (typeof node == 'string' || typeof node == 'number')
      node = doc.createTextNode(content)
    element.replaceChild(node, element.childNodes[0])
  }
  const updateTag = (id, tag, content) => {
    const element = doc.getElementById(id)
    if (!element) return console.log(`No element with id ${id}`)
    element.setAttribute(tag, content)
  }
  const updateStyle = (id, property, content) => {
    const element = doc.getElementById(id)
    if (!element) return console.log(`No element with id ${id}`)
    var replace = `${property}:(.+?);`
    var re = new RegExp(replace)
    const style = element
      .getAttribute('style')
      .replace(re, `${property}: ${content};`)
    element.setAttribute('style', style)
  }

  // Card color
  if (treasure.cardColor === 'black') {
    updateStyle('container', 'background-color', '#272522')
    updateStyle('container', 'color', 'white')
    updateStyle('match-anchor', 'color', 'white')
    updateStyle('top-username-anchor', 'color', 'white')
    updateStyle('bottom-username-anchor', 'color', 'white')
  }

  // Header
  updateContent('title', treasure.title)
  updateContent('page-title', treasure.title)
  updateContent('termination', treasure.termination)
  updateTag('banner-image', 'src', `data:image/png;base64,${bannerLogoBase64}`)
  const rarityColor = getRarityColor(treasure.achievementScore)
  updateStyle('banner', 'background-color', rarityColor)

  // Users
  const { bottomUser, topUser } = getOrderedUsers(treasure)
  Object.keys(topUser).map((key) => updateContent(`top-${key}`, topUser[key]))
  Object.keys(bottomUser).map((key) =>
    updateContent(`bottom-${key}`, bottomUser[key])
  )
  updateTag(
    'top-username-anchor',
    'href',
    `https://treasure.chess.com/member/${topUser.username}`
  )
  updateTag('top-avatar', 'src', topUser.imageSrc)
  updateTag('bottom-avatar', 'src', bottomUser.imageSrc)
  updateTag('top-flag', 'src', topUser.flagImageSrc)
  updateTag('bottom-flag', 'src', bottomUser.flagImageSrc)
  updateStyle('bottom-ratingDelta', 'color', bottomUser.ratingDeltaColor)
  updateStyle('top-ratingDelta', 'color', topUser.ratingDeltaColor)

  // Game GIF / Final positions
  updateTag(
    'game-image',
    'src',
    (gifData && `data:image/gif;base64,${gifData}`) || gifUrl
  )
  // TODO: Replace treasureBackgroundBase64 with final positions image
  const staticImageUrl = `data:image/png;base64,${treasureBackgroundBase64}`
  updateStyle('game-image', 'background-image', `url('${staticImageUrl}')`)
  updateTag('game-anchor', 'href', treasure.externalUrl)

  // Achievements
  updateContent('achievement-1-icon', iconByPoints(5, treasure.cardColor), true)
  updateContent('achievement-2-icon', iconByPoints(4, treasure.cardColor), true)
  updateContent('achievement-3-icon', iconByPoints(3, treasure.cardColor), true)
  const achievements = treasure.achievements.split(',')
  updateContent('achievement-1', achievements[0])
  updateContent('achievement-2', achievements[1])
  updateContent('achievement-3', achievements[2])

  // Metadata
  updateContent(
    'metadata-1-icon',
    iconByName('trophy', treasure.cardColor),
    true
  )
  updateContent(
    'metadata-2-icon',
    iconByName('board', treasure.cardColor),
    true
  )
  updateContent(
    'metadata-3-icon',
    iconByName('timer', treasure.cardColor),
    true
  )
  updateContent('metadata-ruleVariant', treasure.ruleVariant)
  updateContent('metadata-timeControl', treasure.timeControl)
  updateStyle('metadata-rarity', 'color', rarityColor)
  updateTag('trophy-icon-path', 'fill', rarityColor)
  updateContent(
    'metadata-rarity',
    `${treasure.achievementScore} ${treasure.rarity}`
  )

  // Footer
  updateContent(
    'match-anchor',
    `Match #${treasure.externalUrl.split('/').pop()}`
  )
  updateTag('match-anchor', 'href', treasure.externalUrl)
  updateContent('date', formatDate(treasure.endTime))

  return formatXml(serializer.serializeToString(doc))
}

module.exports = getCard

// To test, uncomment and run "node index"
// const test = () => {
//   let [treasure] = require('../../scripts/seed/treasure')
//   const members = require('../../scripts/seed/member')
//   const white = members.find(
//     (member) => member.username === treasure.whiteUsername
//   )
//   const black = members.find(
//     (member) => member.username === treasure.blackUsername
//   )
//   treasure.blackRatingDelta
//   treasure.white = white
//   treasure.black = black
//   const html = getCard({
//     treasure,
//     // gifUrl: 'https://i.imgur.com/OQCBrle.gif',
//     gifUrl:
//       'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
//   })
//   const fs = require('fs')
//   fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
// }
// test()
