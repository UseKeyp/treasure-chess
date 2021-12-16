const { DOMParser, XMLSerializer } = require('xmldom')
const {
  formatDate,
  getFlagBase64,
  iconByName,
  iconByPoints,
  getRarityColor,
  fetchImageAndEncodeBase64,
  formatXml,
  getRatingText,
} = require('./helpers')

const { card, maskedAchievements } = require('./card.js')

const treasureBackgroundBase64 = require('./assets/treasureBackground')
const bannerLogoBase64 = require('./assets/bannerLogo')

const serializer = new XMLSerializer()
const parser = new DOMParser()
let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const getOrderedUsers = (treasure) => {
  const { text: blackRatingDelta, color: blackRatingDeltaColor } =
    getRatingText(treasure, 'black')
  const { text: whiteRatingDelta, color: whiteRatingDeltaColor } =
    getRatingText(treasure, 'white')
  const blackUser = {
    username: treasure.blackUsername,
    rating: treasure.blackRating,
    ratingDelta: blackRatingDelta,
    ...(treasure.blackMasterTitle && {
      masterTitle: treasure.blackMasterTitle,
    }),
    // // Not content, but rather "styles" and "src"
    ...(blackRatingDeltaColor && { ratingDeltaColor: blackRatingDeltaColor }),
    imageSrc: treasure.black.imageSrc,
    flagImageSrc: getFlagBase64(treasure.black.country),
    flag: treasure.black.country,
  }
  const whiteUser = {
    username: treasure.whiteUsername,
    rating: treasure.whiteRating,
    ratingDelta: whiteRatingDelta,
    ...(treasure.whiteMasterTitle && {
      masterTitle: treasure.whiteMasterTitle,
    }),
    // // Not content, but rather "styles" and "src"
    ...(whiteRatingDeltaColor && { ratingDeltaColor: whiteRatingDeltaColor }),
    imageSrc: treasure.white.imageSrc,
    flagImageSrc: getFlagBase64(treasure.white.country),
    flag: treasure.white.country,
  }
  let topUser = blackUser
  let bottomUser = whiteUser
  if (treasure.cardColor === 'black') {
    topUser = whiteUser
    bottomUser = blackUser
  }
  return { bottomUser, topUser }
}

// Pass gifData to get the final HTML to pin to IPFS
// OR pass gifUrl to fetch a smaller HTML file for the Frontend
// gifUrl version should load faster, b/c it delays fetching the gif
const getCard = async ({ treasure, gifData, gifUrl }) => {
  const doc = parser.parseFromString(card, 'text/html')

  const updateContent = (id, content, isNodeString) => {
    const element = doc.getElementById(id)
    if (!element) return //console.log(`No element with id ${id}`)
    if (content === undefined) {
      const parent = element.parentNode
      return parent.removeChild(element)
    }
    let node = content
    if (isNodeString) {
      const node = parser.parseFromString(content, 'text/html')
      return element.replaceChild(node, element.childNodes)
    } else if (typeof node == 'string' || typeof node == 'number') {
      node = doc.createTextNode(content)
    }
    element.replaceChild(node, element.childNodes[0])
  }
  const updateTag = (id, tag, content) => {
    const element = doc.getElementById(id)
    if (!element) return // console.log(`No element with id ${id}`)
    element.setAttribute(tag, content)
  }
  const updateStyle = (id, property, content) => {
    const element = doc.getElementById(id)
    if (!element) return // console.log(`No element with id ${id}`)
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
    updateStyle('top-username', 'color', 'white')
    updateStyle('bottom-username', 'color', 'white')
    updateStyle('bottom-rating', 'color', 'white')
    updateStyle('top-rating', 'color', 'white')
    updateStyle('match-anchor', 'color', 'white')
    updateStyle('edition', 'color', 'white')
    updateStyle('date', 'color', 'white')
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
    `https://treasure.chess.com/members/${topUser.username}`
  )
  updateTag(
    'bottom-username-anchor',
    'href',
    `https://treasure.chess.com/members/${bottomUser.username}`
  )
  if (!bottomUser.masterTitle)
    updateStyle('bottom-masterTitle', 'background-color', null)
  if (!topUser.masterTitle)
    updateStyle('top-masterTitle', 'background-color', null)

  // The only async function here (this could break things)
  const topAvatarBase64 = await fetchImageAndEncodeBase64(topUser.imageSrc)
  const bottomAvatarBase64 = await fetchImageAndEncodeBase64(
    bottomUser.imageSrc
  )
  updateTag('top-avatar', 'src', topAvatarBase64)
  updateTag(
    'top-avatar',
    'alt',
    `Avatar for chess.com user ${topUser.username}`
  )
  updateTag('bottom-avatar', 'src', bottomAvatarBase64)
  updateTag(
    'bottom-avatar',
    'alt',
    `Avatar for chess.com user ${bottomUser.username}`
  )
  updateTag('top-flagImage', 'src', topUser.flagImageSrc)
  updateTag('top-flagImage', 'alt', `Flag of ${regionNames.of(topUser.flag)}`)
  updateTag(
    'bottom-flagImage',
    'alt',
    `Flag of ${regionNames.of(bottomUser.flag)}`
  )
  updateTag('bottom-flagImage', 'src', bottomUser.flagImageSrc)
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
  updateTag(
    'game-anchor',
    'href',
    `https://treasure.chess.com/treasures/${treasure.tokenId}`
  )
  if (treasure.achievements) {
    // Achievements
    updateContent(
      'achievement-1-icon',
      iconByPoints(5, treasure.cardColor),
      true
    )
    updateContent(
      'achievement-2-icon',
      iconByPoints(4, treasure.cardColor),
      true
    )
    updateContent(
      'achievement-3-icon',
      iconByPoints(3, treasure.cardColor),
      true
    )
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
  } else {
    updateContent('achievements', maskedAchievements, true)
  }

  // Footer
  updateContent(
    'match-anchor',
    `Match #${treasure.externalUrl.split('/').pop()}`
  )
  updateTag('match-anchor', 'href', treasure.externalUrl)
  updateContent('date', formatDate(treasure.endTime))

  return formatXml(serializer.serializeToString(doc))
}

export default getCard
