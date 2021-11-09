const { DOMParser, XMLSerializer } = require('xmldom')
const { formatDate } = require('./helpers')
const htmlString = require('./card.js')
const getFlagBase64 = require('./flag')

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

  const { bottomUser, topUser } = getOrderedUsers(treasure)
  Object.keys(topUser).map((key) => updateContent(`top-${key}`, topUser[key]))
  Object.keys(bottomUser).map((key) =>
    updateContent(`bottom-${key}`, bottomUser[key])
  )

  updateTag('top-avatar', 'src', topUser.imageSrc)
  updateTag('bottom-avatar', 'src', bottomUser.imageSrc)
  updateTag('top-flag', 'src', topUser.flagImageSrc)
  updateTag('bottom-flag', 'src', bottomUser.flagImageSrc)

  // Match link
  updateContent('match', `Match #${treasure.externalUrl.split('/').pop()}`)
  updateTag('match', 'href', treasure.externalUrl)
  // Date
  updateContent('date', formatDate(treasure.endTime))

  updateContent('title', treasure.title)
  updateContent('termination', treasure.termination)
  updateTag(
    'gif',
    'src',
    (gifData && `data:image/gif;base64,${gifData}`) || gifUrl
  )

  return serializer.serializeToString(doc)
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
  const html = getCard({ treasure, gifUrl: 'https://picsum.photos/200/200' })
  const fs = require('fs')
  fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
}
test()
