const { DOMParser, XMLSerializer } = require('xmldom')

const htmlString = require('./card.js')

const serializer = new XMLSerializer()
const parser = new DOMParser()

const getOrderedUsers = (treasure) => {
  const {
    blackUsername,
    blackRating,
    blackMasterTitle,
    whiteUsername,
    whiteRating,
    whiteMasterTitle,
    cardColor,
  } = treasure
  let topUser = {
    topUsername: blackUsername,
    topRating: blackRating,
    topMasterTitle: blackMasterTitle,
  }
  let bottomUser = {
    bottomUsername: whiteUsername,
    bottomRating: whiteRating,
    bottomMasterTitle: whiteMasterTitle,
  }
  if (cardColor === 'black') {
    topUser = {
      topUsername: whiteUsername,
      topRating: whiteRating,
      topMasterTitle: whiteMasterTitle,
    }
    bottomUser = {
      bottomUsername: blackUsername,
      bottomRating: blackRating,
      bottomMasterTitle: blackMasterTitle,
    }
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
    const textNode = doc.createTextNode(content)
    element.replaceChild(textNode, element.childNodes[0])
  }
  const updateTag = (id, tag, content) => {
    const element = doc.getElementById(id)
    if (!element) return console.log(`No element with id ${id}`)
    element.setAttribute(tag, content)
  }

  const { bottomUser, topUser } = getOrderedUsers(treasure)
  Object.keys(bottomUser).map((key) => updateContent(key, bottomUser[key]))
  Object.keys(topUser).map((key) => updateContent(key, topUser[key]))

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
  const [treasure] = require('../../api/db/seed/treasure')
  const html = getCard({ treasure, gifUrl: 'https://picsum.photos/200/200' })
  const fs = require('fs')
  fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
}
test()
