var ChessImageGenerator = require('@treasure-chess/chess-image-generator')

var imageGenerator = new ChessImageGenerator({
  size: 640,
  dark: 'rgb(181, 137, 98)',
  light: 'rgb(241, 216, 180)',
  style: 'neo',
})

const getFinalPositionImage = async ({ pgn }) => {
  imageGenerator.loadPGN(pgn)
  const imgBuf = imageGenerator.generateBuffer()

  // decode buffer as Base64
  return buff.toString('base64')
}

module.exports = { getFinalPositionImage }
