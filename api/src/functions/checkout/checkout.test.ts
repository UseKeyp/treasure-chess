import { mockHttpEvent } from '@redwoodjs/testing/api'
import { handler } from './checkout'

describe('checkout serverless function', () => {
  it('divides two numbers successfully', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        orderId: 'abc123',
      },
    })

    const result = await handler(httpEvent)
    const body = result.body

    expect(result.statusCode).toBe(200)
    expect(body.message).toContain('=')
    expect(body.quotient).toEqual(4)
  })
})
