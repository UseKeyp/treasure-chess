import ChessImageGenerator from '@treasure-chess/chess-image-generator'

//outputs base64 data for a jpeg, NOT a png
export const getFinalPositionImage = async (pgn, playerColor) => {
  if (!pgn) {
    throw new Error('no PGN passed')
  }

  let flipped = false
  if (playerColor === 'black') flipped = true

  var imageGenerator = new ChessImageGenerator({
    size: 640,
    dark: 'rgb(181, 137, 98)',
    light: 'rgb(241, 216, 180)',
    style: 'neo',
    flipped,
  })

  await imageGenerator.loadPGN(pgn)
  const imgBuf = await imageGenerator.generateBuffer()

  // decode buffer as Base64
  return `data:image/jpeg;base64,${imgBuf.toString('base64')}`
}
