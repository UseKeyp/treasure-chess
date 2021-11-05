const { DOMParser, XMLSerializer } = require('xmldom')

const htmlString = require('./card.js')

const getCard = ({ treasure }) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const serializer = new XMLSerializer()
  return serializer.serializeToString(doc)
}

module.exports = getCard

// To test, uncomment and run "node index"
const test = () => {
  const html = getCard({})
  console.log(html)
  const fs = require('fs')
  fs.writeFile('deleteme.html', html, (e) => console.log(e))
}
test()
