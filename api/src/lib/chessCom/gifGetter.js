//import fetch from 'cross-fetch'
const fetch = require('cross-fetch')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const poll = async (url) => {
  const result = await fetch(url)
  if (result?.status !== 200) return poll(url)
  return result
}

//playerColor should be "white" or "black"
//tcn via player archive api
const getGifs = async ({ tcn, playerColor }) => {
  var colorBit = 0
  if (playerColor === 'black') {
    colorBit = 1
  }

  //base64 the tcn
  const tcnBuffer = Buffer.from(tcn, 'utf-8')
  let tcn64 = tcnBuffer.toString('base64')
  tcn64 = tcn64
    .replace(/["="]/g, ',')
    .replace(/["+"]/g, '-')
    .replace(/["/"]/g, '_')

  const baseGifUrl =
    'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/' +
    colorBit +
    '/'
  var gifUrl = baseGifUrl + tcn64 + `.gif`

  const result = await poll(gifUrl)
  console.log(result)

  var gifdata = result.body
  const gifBuffer = Buffer.from(gifdata.toString(), 'utf-8')
  const gif64 = gifBuffer.toString('base64')

  return { gif64, gifUrl }
}

getGifs({
  tcn: 'mC5QfA0KltWGgv9Iks!TcM3VMF2MFwZRegIWiq70blXPjzGyAH6XlA86dy0ZHQZQyWMEvFVNFL7ZqyNFwFT!Fw!VLV?VyG1TGPYPAP6YPZQZzHTLCLZHfbHQayQo',
  playerColor: 'white',
})
//export default getGifs
