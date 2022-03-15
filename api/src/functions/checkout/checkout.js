import Sentry from 'src/lib/sentry'
import { processOrder } from 'src/lib/wyre/order'
import { logger } from 'src/lib/logger'

export const handler = async (event) => {
  logger.debug('Invoked /checkout')
  // Default response
  let statusCode = 200

  try {
    // TODO:  Add logging
    // Webhook sent by Wyre (or anyone on the web) after Wyre checkout
    let body = event.body
    if (typeof body === 'string') body = JSON.parse(body)

    await processOrder(body)

    return {
      statusCode,
      body: {
        message: 'Success!',
      },
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error(event)
    // Really these should never happen, since processOrder catches its own errors
    Sentry.captureException(e)
    return {
      statusCode, // Always return 200
      body: {
        message: 'Internal server error',
      },
    }
  }
}
