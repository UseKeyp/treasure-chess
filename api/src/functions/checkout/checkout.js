import Sentry from 'src/lib/sentry'
import { processOrder } from 'src/lib/checkout'
import { logger } from 'src/lib/logger'

export const handler = async (event) => {
  logger.debug('Invoked /checkout')
  // Default response
  let statusCode = 200

  try {
    const stripeSignature = event.headers['stripe-signature']
    let body = event.body
    // Don't modify the body if Stripe
    if (!stripeSignature && typeof body === 'string') body = JSON.parse(body)

    await processOrder({ body, stripeSignature })

    return {
      statusCode,
      body: { message: 'Success!' },
      rawBody: event.body,
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    logger.error({ custom: event }, 'event')
    logger.error(e)
    // Really these should never happen, since processOrder catches its own errors
    Sentry.captureException(e)
    return {
      statusCode, // Always return 200
      body: { message: 'Internal server error' },
    }
  }
}
