const { DOMParser, XMLSerializer } = require('xmldom')
const {
  formatDate,
  getFlagBase64,
  iconByName,
  iconByPoints,
  getRarityColor,
  fetchImageAndEncodeBase64,
  getRatingText,
  getDescription,
} = require('./helpers')

const { card, maskedAchievements } = require('./card.js')

const treasureBackgroundBase64 = require('./assets/treasureBackground')

const serializer = new XMLSerializer()
const parser = new DOMParser()

const APP_DOMAIN = process.env.APP_DOMAIN

const getOrderedUsers = (treasure) => {
  const { text: blackRatingDelta, color: blackRatingDeltaColor } =
    getRatingText(treasure, 'black')
  const { text: whiteRatingDelta, color: whiteRatingDeltaColor } =
    getRatingText(treasure, 'white')
  const blackUser = {
    username: treasure.black.username,
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
    username: treasure.white.username,
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

// Pass gifBase64 to get the final HTML to pin to IPFS
// OR pass gifUrl to fetch a smaller HTML file for the Frontend
// gifUrl version should load faster, b/c it delays fetching the gif
const getCardHtml = async ({ treasure, gifBase64, gifUrl }) => {
  try {
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
    updateTag('og:title', 'content', treasure.title)
    updateTag('twitter:title', 'content', treasure.title)
    updateTag('twitter:image', 'content', `${APP_DOMAIN}/seo.png`)
    const description = getDescription(treasure)
    updateTag('twitter:description', 'content', description)
    updateTag('og:description', 'content', description)
    updateTag('description', 'content', description)
    updateTag(
      'og:url',
      'content',
      `${APP_DOMAIN}/treasures/${treasure.tokenId}`
    )
    updateContent('termination', treasure.termination)
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
      `${APP_DOMAIN}/members/${topUser.username}`
    )
    updateTag(
      'bottom-username-anchor',
      'href',
      `${APP_DOMAIN}/members/${bottomUser.username}`
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
    updateTag('top-flagImage', 'alt', `Flag of ${topUser.country}`)
    updateTag('bottom-flagImage', 'alt', `Flag of ${bottomUser.country}`)
    updateTag('bottom-flagImage', 'src', bottomUser.flagImageSrc)
    updateStyle('bottom-ratingDelta', 'color', bottomUser.ratingDeltaColor)
    updateStyle('top-ratingDelta', 'color', topUser.ratingDeltaColor)

    // Game GIF / Final positions
    updateTag(
      'game-image',
      'src',
      (gifBase64 && `data:image/gif;base64,${gifBase64}`) || gifUrl
    )
    // TODO: Replace treasureBackgroundBase64 with final positions image
    const staticImageUrl = `data:image/png;base64,${treasureBackgroundBase64}`
    updateStyle('game-image', 'background-image', `url('${staticImageUrl}')`)
    if (treasure.tokenId)
      updateTag(
        'game-anchor',
        'href',
        `${APP_DOMAIN}/treasures/${treasure.tokenId}`
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

    return serializer.serializeToString(doc)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export default getCardHtml
