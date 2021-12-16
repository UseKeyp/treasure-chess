var ChessImageGenerator = require('@treasure-chess/chess-image-generator')

export const getFinalPositionImage = async (pgn, playerColor) => {
  if (!pgn) {
    throw new Error('no PGN passed')
  }

  let flipped = true
  if (playerColor === 'white') {
    flipped = false
  }

  var imageGenerator = new ChessImageGenerator({
    size: 640,
    dark: 'rgb(181, 137, 98)',
    light: 'rgb(241, 216, 180)',
    style: 'neo',
    flipped, // false = white, true = black
  })

  await imageGenerator.loadPGN(pgn)
  const imgBuf = await imageGenerator.generateBuffer()

  // decode buffer as Base64
  return `data:image/jpeg;base64,${imgBuf.toString('base64')}`
}
