var ChessImageGenerator = require('@treasure-chess/chess-image-generator')

var imageGenerator = new ChessImageGenerator({
  size: 720,
  dark: 'rgb(181, 137, 98)',
  light: 'rgb(241, 216, 180)',
  style: 'neo',
})

const getFinalPositionImage = async ({ pgn }) => {}

module.exports = { getFinalPositionImage }
