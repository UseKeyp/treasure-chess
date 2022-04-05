import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.debug('Invoked /prerender')
  try {
    logger.debug({ custom: event }, 'event')
    logger.debug({ custom: Object.keys(event) }, 'keys')
    const { url } = event.queryStringParameters

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `<html><body>Hello world</body></html>`,
    }
  } catch (error) {
    /* eslint-disable no-console */
    logger.error(error, { custom: event })
    /* eslint-enable no-console */
    Sentry.captureException(error)
    return {
      statusCode: 500,
      body: {
        message: `Internal server error. ${error}`,
      },
    }
  }
}
