import { logger } from 'src/lib/logger'
import client from 'prom-client'
import Sentry from 'src/lib/sentry'
import { getBusinessMetrics } from 'src/lib/metrics'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, _context) => {
  try {
    logger.info('Invoked metrics function')

    const collectDefaultMetrics = client.collectDefaultMetrics
    const Registry = client.Registry
    const register = new Registry()
    collectDefaultMetrics({ register })

    const promData = await register.metrics()
    let businessData = {}
    try {
      businessData = await getBusinessMetrics()
    } catch (e) {}

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: { promData, businessData } }),
    }
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e)
    console.log(event)
    /* eslint-enable no-console */
    Sentry.captureException(e)
    return {
      statusCode: 500, // Always return 200
      body: {
        message: 'Internal server error',
      },
    }
  }
}
