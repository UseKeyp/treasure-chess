const randomTitles = require('./randomTitles')
const fs = require('fs')
const titles = randomTitles.map((title) => {
  const [firstWord, ...rest] = title.toLowerCase().split(' ')
  return (
    firstWord.charAt(0).toUpperCase() +
    firstWord.substr(1) +
    ' ' +
    rest.join(' ')
  )
})
console.log('Total titles: ', titles.length)
fs.writeFileSync('./randomTitles.json', JSON.stringify(titles))
