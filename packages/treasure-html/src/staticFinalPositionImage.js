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
    // style: 'neo', // default is neo
    flipped,
  })

  await imageGenerator.loadPGN(pgn)
  const base64str = await imageGenerator.generateDataURL()

  return base64str
}
