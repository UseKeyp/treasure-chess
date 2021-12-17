const getBoardBase64 = require('@treasure-chess/chess-image-generator')
import Sentry from 'src/lib/sentry'
import { InputError } from '@redwoodjs/graphql-server'

export const handler = async (event) => {
  try {
    let body = event.body
    if (typeof body === 'string') body = JSON.parse(body)

    const boardBase64 = await getBoardBase64(
      body.moves,
      body.playerColor,
      body.options
    )

    return {
      statusCode: 200,
      body: {
        boardBase64,
      },
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
