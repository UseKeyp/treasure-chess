import { GamesContext } from 'src/providers/context/GamesContext'
import { P } from 'src/components/Typography'
import Loader from 'src/components/Loader'

const getBoardBase64 = require('@treasure-chess/chess-image-generator')
import { getCardHtml } from '@treasure-chess/treasure-html'
import placeholderGame from './placeholderGameData'

const options = {
  size: 400,
  dark: 'rgb(181, 137, 98)',
  light: 'rgb(241, 216, 180)',
  style: 'neo',
}

const GameCard = ({ game, isMinting }) => {
  const [context] = React.useContext(GamesContext)
  const { gameTitle } = context
  const [cardHtml, setCardHtml] = React.useState()
  const update = async () => {
    let raw
    if (isMinting && !game) {
      raw = await getCardHtml({
        treasure: { ...placeholderGame },
        gifUrl: game.gifUrl,
      })
    } else {
      raw = await getCardHtml({
        treasure: { ...game, title: gameTitle || game.title || 'Add a title' },
        gifUrl: game.gifUrl,
        // If mobile, load static images?
        // gifUrl: await getBoardBase64(
        //   game.moves, // List of moves or PGN
        //   game.cardColor, // Which player to show on bottom
        //   options
        // ),
      })
    }
    setCardHtml(raw)
  }

  React.useEffect(() => {
    if (!isMinting && !game) return
    update()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [game, gameTitle, isMinting])

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
