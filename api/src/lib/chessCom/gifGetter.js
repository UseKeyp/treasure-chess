const fetch = require('cross-fetch')
// const { logger } = require('../logger')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// Polls until the URL returns status 200, for a max 20 seconds
const poll = async (url, retries = 0) => {
  try {
    if (retries > 19)
      throw `Maximum attempts reached. Couldn't fetch url ${url}`
    let result = await fetch(url, {
      headers: {
        // Required to prevent rate-limiting
        Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
      },
    })
    if (result.status === 200) return result
    await sleep(1000)
    return await poll(url, retries + 1)
  } catch (e) {
    // logger.error(e)
    throw `poll() ${e}`
  }
}

const getGifUrl = ({ tcn, playerColor }) => {
  try {
    if (!tcn) throw 'No tcn provided'
    if (!playerColor) throw 'No playerColor provided'
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
    return baseGifUrl + tcn64 + `.gif`
  } catch (e) {
    // logger.error(e)
    throw `getGifUrl() ${e}`
  }
}

// playerColor should be "white" or "black"
// tcn via player archive api
const getGifBase64 = async ({ tcn, playerColor }) => {
  try {
    if (!tcn) throw 'No tcn provided'
    if (!playerColor) throw 'No playerColor provided'
    const gifUrl = getGifUrl({ tcn, playerColor })
    const response = await poll(gifUrl)
    let gifBase64 = await response.buffer()
    gifBase64 = gifBase64.toString('base64')
    return { gifBase64, url: gifUrl }
  } catch (e) {
    // logger.error(e)
    throw `getGifBase64() ${e}`
  }
}

module.exports = { getGifUrl, getGifBase64 }

// To test, uncomment and run `node gifGetter`
// getGifUrl({
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
