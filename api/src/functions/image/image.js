import {
  getBoardBase64,
  getBoardLayout,
} from '@treasure-chess/chess-image-generator'
import Sentry from 'src/lib/sentry'

export const handler = async (event) => {
  try {
    const { moves, playerColor, options, dataOnly } =
      event.queryStringParameters

    const boardLayout = getBoardLayout(moves)

    const boardBase64 = await getBoardBase64(boardLayout, playerColor, options)

    if (dataOnly) {
      return {
        statusCode: 200,
        body: boardBase64,
      }
    }
    const buffer = Buffer.from(boardBase64.split('base64,')[1], 'base64')
    return {
      headers: { 'Content-Type': 'image/jpeg' },
      statusCode: 200,
      body: buffer,
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    Sentry.captureException(e)
    return {
      statusCode: 500, // Always return 200
      body: {
        message: 'Internal server error',
      },
    }
  }
}
