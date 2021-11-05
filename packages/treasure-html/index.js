const { DOMParser, XMLSerializer } = require('xmldom')

const htmlString = require('./card.js')

const getCard = ({ treasure }) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const updateContent = (id, content) => {
    const element = doc.getElementById(id)
    const textNode = doc.createTextNode(content)
    element.replaceChild(textNode, element.childNodes[0])
    return doc
  }

  updateContent('player-one-name', 'pg')

  const serializer = new XMLSerializer()
  return serializer.serializeToString(doc)
}

module.exports = getCard

// To test, uncomment and run "node index"
const test = () => {
  const html = getCard({})
  const fs = require('fs')
  fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
}
test()
