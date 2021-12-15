import { GamesContext } from 'src/providers/context/GamesContext'
import { P } from 'src/components/Typography'
import Loader from 'src/components/Loader'

const getCard = require('@treasure-chess/treasure-html')

import placeholderGame from './placeholderGameData'

const GameCard = ({ game, isMinting }) => {
  const [context] = React.useContext(GamesContext)
  const { gameTitle } = context
  const [cardHtml, setCardHtml] = React.useState()
  const update = async () => {
    let raw
    if (isMinting && !game) {
      raw = await getCard({
        treasure: { ...placeholderGame },
        gifUrl:
          'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
      })
    } else {
      raw = await getCard({
        treasure: { ...game, title: gameTitle || 'Add a title' },
        gifUrl:
          'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
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
