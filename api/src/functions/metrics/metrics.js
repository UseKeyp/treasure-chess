import { logger } from 'src/lib/logger'
import client from 'prom-client'
import Sentry from 'src/lib/sentry'
import { getBusinessMetrics } from 'src/lib/metrics'

export const handler = async (event, _context) => {
  try {
    logger.info('Invoked metrics function')

    const collectDefaultMetrics = client.collectDefaultMetrics
    const Registry = client.Registry
    const register = new Registry()
    collectDefaultMetrics({ register })

    const { type } = event.queryStringParameters
    if (!type || type === 'prom') {
      const promData = await register.metrics()
      return {
        statusCode: 200,
        body: promData,
      }
    } else if (type === 'business') {
      const businessData = await getBusinessMetrics()
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: businessData,
      }
    }
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    console.log(event)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    return {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    }
  }
}
