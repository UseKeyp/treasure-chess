import Sentry from 'src/lib/sentry'
import { processOrder } from 'src/lib/wyre/order'

export const handler = async (event) => {
  // Default response
  let statusCode = 200

  try {
    // TODO:  Add logging
    // Webhook sent by Wyre (or anyone on the web) after Wyre checkout
    let body = event.body
    if (typeof body === 'string') body = JSON.parse(body)

    await processOrder({ orderId: body.orderId, referenceId: body.referenceId })

    return {
      statusCode,
      body: {
        message: 'Success!',
      },
    }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(event)
    Sentry.captureException(e)
    return {
      statusCode, // Always return 200
      body: {
        message: 'Internal server error',
      },
    }
  }
}
