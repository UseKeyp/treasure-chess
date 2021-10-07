import { processOrder } from 'src/lib/wyre/wyre'

const methods = ['completeOrder']

export const handler = async (event) => {
  // Default response
  let statusCode = 200
  let message = ''

  try {
    // TODO:  Add logging
    console.log(event)

    const { orderId, method } = event.queryStringParameters

    // Sent by Tresure Chess redirect page after Wyre checkout
    // TODO: Not a valid method, since referenceId is not included
    // if (method === 'completeOrder') {
    //   if (orderId === undefined) {
    //     throw Error(`Please provide an orderId.`)
    //   }
    //   await processOrder(orderId)
    //   return {
    //     statusCode,
    //     body: {
    //       message: 'Success!',
    //     },
    //   }
    // }

    // Fallback to webhook sent by Wyre (or anyone on the web) after Wyre checkout
    let body = event.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch (e) {
        throw Error('Internal server error')
      }
    }
    await processOrder(body.reservation)

    return {
      statusCode,
      body: {
        message: 'Success!',
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
