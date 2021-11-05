import fetch from 'cross-fetch'

//color should be "white" or "black"
const getGifs = async ({ tcn, playerColor }) => {
  var colorBit = 0
  if (playerColor === 'black') {
    colorBit = 1
  }

  //base64 the tcn
  const tcnBuffer = Buffer.from(tcn, 'utf-8')
  const tcn64 = tcnBuffer.toString('base64')
  tcn64 = tcn64.replace(/["="]/g, ",").replace(/["+"]/g , "-").replace(/["/"]/g, "_")

  const baseGifUrl =
    'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/' +
    colorBit +
    '/'

  var gifUrl = baseGifUrl + tcn64 + `.gif`

  //poll for gif, until we see a 200
  let result
  while(result?.status !== 200){
    result = await fetch(gifUrl)
  }

  var gifdata = result.body
  const gifBuffer = Buffer.from(gifdata, 'utf-8')
  const gif64 = gifBuffer.toString('base64')


  return { base64gif, tcn64 }
}

export default getGifs
