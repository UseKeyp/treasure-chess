const getBoardLayout = require('@treasure-chess/chess-image-generator/src/getBoardLayout')
const getBoardBase64Node = require('@treasure-chess/chess-image-generator/src/node/getBoardBase64-node')
import Sentry from 'src/lib/sentry'
import { logger } from 'src/lib/logger'

export const handler = async (event) => {
  logger.debug('Invoked /image')
  try {
    const { moves, playerColor, options, dataOnly, boardLayout } = JSON.parse(
      event.body
    )
    let config = {
      size: 640,
      dark: 'rgb(181, 137, 98)',
      light: 'rgb(241, 216, 180)',
      style: 'neo',
    }
    if (options) config = options

    let layout = boardLayout
    if (!layout) {
      if (!moves) throw 'No boardLayout or moves provided'
      layout = getBoardLayout(moves)
    }
    const buffer = await getBoardBase64Node(layout, playerColor, config)
    if (dataOnly) {
      return {
        statusCode: 200,
        body: buffer,
      }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/jpeg' },
      body: buffer,
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(e)
    Sentry.captureException(e)
    return {
      statusCode: 500, // Always return 200
      body: {
        message: `Internal server error ${e}`,
      },
    }
  }
}
