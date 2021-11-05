const fetch = require('cross-fetch')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const poll = async (url) => {
  let result = await fetch(url)
  if (result.status === 200) return result
  await sleep(1000)
  return await poll(url)
}

//playerColor should be "white" or "black"
//tcn via player archive api
const getGif = async ({ tcn, playerColor }) => {
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

  const response = await poll(gifUrl)
  let gifBase64 = await response.buffer()
  gifBase64 = gifBase64.toString('base64')

  return { gifBase64, url: gifUrl }
}

module.exports = getGif

// To test, uncomment and run `node gifGetter`
// getGif({
//   tcn: 'mC0KfA7Mdv9Iv187bsInen',
//   playerColor: 'white',
// }).then(({ gifBase64, url }) => {
//   const fs = require('fs')
//   fs.createWriteStream('deleteme.html').write(
//     `<body><img src="data:image/gif;base64,${gifBase64}"/></body>`
//   )
//   console.log(url)
//   console.log('Html file created')
// })
