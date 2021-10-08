import { processOrder } from 'src/lib/wyre/order'

const methods = ['completeOrder']

export const handler = async (event) => {
  // Default response
  let statusCode = 200
  let message = ''

  try {
    // TODO:  Add logging
    console.log(event)
    // Webhook sent by Wyre (or anyone on the web) after Wyre checkout
    let body = event.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch (e) {
        console.log(e)
        throw Error('')
      }
    }
    console.log(body)
    await processOrder({ orderId: body.orderId, referenceId: body.referenceId })

    return {
      statusCode,
      body: {
        message: 'Success!',
      },
    }
  } catch (error) {
    console.log(event)
    return {
      statusCode, // Always return 200
      body: {
        message: 'Internal server error',
      },
    }
  }
}
