import { getCardHtml } from '../src/index'
import {
  generateRandomTreasures,
  generateRandomMembers,
} from '../../../scripts/seed/helpers'
import fs from 'fs'

const test = async () => {
  const members = generateRandomMembers(2, 0)
  const treasure = generateRandomTreasures(1, 1, members)[0]
  treasure.white = members[0]
  treasure.black = members[1]
  const html = await getCardHtml({
    treasure,
    // gifUrl: 'https://i.imgur.com/OQCBrle.gif',
    gifUrl:
      'https://images.chesscomfiles.com/uploads/game-gifs/90px/green/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif',
  })
  fs.writeFile('deleteme.html', html, (e) => e && console.log(e))
}
test()
