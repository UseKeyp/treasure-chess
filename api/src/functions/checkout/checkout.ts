import type { APIGatewayEvent } from 'aws-lambda'

import { processOrder } from 'src/lib/wyre/wyre'

const methods = ['completeOrder']

export const handler = async (event: APIGatewayEvent) => {
  // sets the default response
  let statusCode = 200
  let message = ''

  try {
    // TODO:  Add logging

    const { orderId, method } = event.queryStringParameters

    if (orderId === undefined || method === undefined) {
      statusCode = 400
      throw Error(`Please provide an orderId and method.`)
    }
    if (!method.includes(method)) {
      statusCode = 404
      throw Error()
    }

    if (method === 'completeOrder') {
      const response = await processOrder(orderId)
      message = 'Success!'
    }

    return {
      statusCode,
      body: {
        message,
      },
    }
  } catch (error) {
    return {
      statusCode,
      body: {
        message: error.message,
      },
    }
  }
}
