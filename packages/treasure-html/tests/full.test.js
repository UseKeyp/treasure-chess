const getCard = require('../src/index')

const test = async () => {
  let [treasure] = require('../../../scripts/seed/treasure')
  const members = require('../../../scripts/seed/member')
  const white = members.find(
    (member) => member.username === treasure.whiteUsername
  )
  const black = members.find(
    (member) => member.username === treasure.blackUsername
  )
  treasure.blackRatingDelta
  treasure.white = white
  treasure.black = black
  const html = await getCard({
    treasure,
    // gifUrl: 'https://i.imgur.com/OQCBrle.gif',
    gifUrl:
      'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
  })
  const fs = require('fs')
  fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
}
test()
