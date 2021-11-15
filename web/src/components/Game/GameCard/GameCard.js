import getCard from '@common/treasure-html'

const GameCard = ({ game, title }) => {
  const [rawHtml, setRawHtml] = React.useState()
  const update = async () => {
    const war = await getCard({
      treasure: game,
      title,
      gifUrl:
        'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
    })
  }
  React.useEffect(() => {
    if (!game) return
    update()
  }, game)
  return (
    <div className="">
      <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
    </div>
  )
}

export default GameCard
