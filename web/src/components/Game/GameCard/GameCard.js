import getCard from '@common/treasure-html'
// const getCard = require('@common/treasure-html')
// import { Context } from 'src/providers/context'

const GameCard = ({ game }) => {
  // const [context] = React.useContext(Context)
  // const { gameTitle } = context
  const [cardHtml, setCardHtml] = React.useState()
  const update = async () => {
    const raw = await getCard({
      treasure: { ...game, title: 'My Game' },
      gifUrl:
        'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
    })
    setCardHtml(raw)
  }
  React.useEffect(() => {
    if (!game) return
    update()
  }, game)
  return (
    <div
      className="min-w-258px"
      dangerouslySetInnerHTML={{ __html: cardHtml }}
    />
  )
}

export default GameCard
