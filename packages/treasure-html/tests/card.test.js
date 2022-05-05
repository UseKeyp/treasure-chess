import { getCardHtml } from '../src/index'
import {
  generateRandomTreasures,
  generateRandomMembers,
} from '../../../scripts/seed/helpers'
import fs from 'fs'

const base64Image =
  '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'
const gifUrl =
  'https://images.chesscomfiles.com/uploads/game-gifs/90px/brown/neo/0/cc/0/0/bEJaUmNEIVRtdTJVZ3Y5MmtBOCFiczVaZnRYUGVnNlhweFlJQkpXT2FiN1lzQ1RDdENQSGpyOTVka0h6eEZaVEN0T0dETUd5TVQwVEZOVEx2TVkwTXZYNmZlNFd1Q0xDdEMwVE5VM1VldTU0YmV5cmtyV3FyYnFpQ2tpYWJyYWV1ZTRhcnVhZXVlNlpvdyE5Z29UMGVjWkV2TUVaY0QwVE0zOSEzVDJURFQ,/cm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUiB3IEtRa3EgLSAwIDE,.gif'

const test = async () => {
  const members = generateRandomMembers(2, 0)
  const treasure = generateRandomTreasures(1, 1, members)[0]
  treasure.white = members[0]
  treasure.black = members[1]
  const html = await getCardHtml({
    treasure,
    gifUrl,
  })
  fs.writeFile('card.deleteme.html', html, (e) => e && console.log(e))
  const htmlPrerender = await getCardHtml({
    treasure,
    staticBase64: base64Image,
    isPrerender: true,
  })
  fs.writeFile(
    'prerender.deleteme.html',
    htmlPrerender,
    (e) => e && console.log(e)
  )
  const htmlScreenshot = await getCardHtml({
    treasure,
    staticBase64: base64Image,
    isScreenshot: true,
  })
  fs.writeFile(
    'screenshot.deleteme.html',
    htmlScreenshot,
    (e) => e && console.log(e)
  )
  const htmlPrerenderResponse = await getCardHtml({
    treasure,
    openGraphImageSrc:
      'https://chess.mypinata.cloud/ipfs/QmdU1A9WsS61Lu8ZY8ZNkcvVKU6MpzFydaNk8aod7CWf53',
  })
  fs.writeFile(
    'htmlPrerenderResponse.deleteme.html',
    htmlPrerenderResponse,
    (e) => e && console.log(e)
  )
}
test()
