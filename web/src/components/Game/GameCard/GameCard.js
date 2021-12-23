import { P } from 'src/components/Typography'
import Loader from 'src/components/Loader'
const {
  getBoardLayout,
  getBoardBase64,
} = require('@treasure-chess/chess-image-generator')
import { getCardHtml } from '@treasure-chess/treasure-html'
import placeholderGame from './placeholderGameData'

const options = {
  size: 400,
  dark: 'rgb(181, 137, 98)',
  light: 'rgb(241, 216, 180)',
  style: 'neo',
}

const GameCard = ({ game, isMinting, title, showGif }) => {
  const [cardHtml, setCardHtml] = React.useState()
  const [imageSrc, setImageSrc] = React.useState('/loading-board.png') // Use loading image
  const update = async () => {
    let raw
    if (isMinting && !game) {
      raw = await getCardHtml({
        treasure: { ...placeholderGame },
        gifUrl: game.gifUrl,
      })
    } else {
      raw = await getCardHtml({
        treasure: { ...game, title: title || game.title || 'Add a title' },
        gifUrl: showGif ? game.gifUrl : imageSrc,
      })
    }
    setCardHtml(raw)
  }

  const fetchImageAndUpdate = async () => {
    let boardLayout
    try {
      // TODO: properly load the board layout from BE
      boardLayout = JSON.parse(game.boardLayout)
    } catch (e) {
      // console.log(e)
    }
    if (!boardLayout) boardLayout = getBoardLayout(game.moves)
    const boardBase64 = await getBoardBase64(
      boardLayout,
      game.cardColor, // Which player to show on bottom
      options
    )
    setImageSrc(boardBase64)
  }

  React.useEffect(() => {
    if (!isMinting && !game) return
    update()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game, title, isMinting, imageSrc])

  React.useEffect(() => {
    if (!showGif) fetchImageAndUpdate()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game])

  if (!isMinting && !game) return null
  return (
    <div className="game-card-wrapper">
      {isMinting && (
        <>
          <div className="game-card-minting-overlay" />
          <div className="game-card-minting-container">
            <div className="items-center">
              <Loader />
              <P fontWeight={700} fontSize={16} color={'chessBlack.100'}>
                Minting
                <br />
                in progress
              </P>
            </div>
          </div>
        </>
      )}
      <div
        className="game-card-html"
        dangerouslySetInnerHTML={{ __html: cardHtml }}
      />
    </div>
  )
}

export default GameCard
