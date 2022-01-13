/* eslint-disable */
import { mockHttpEvent } from '@redwoodjs/testing/api'
import { handler } from './image'

describe('image serverless function', () => {
  it('generates a board image successfully', async () => {
    const httpEvent = mockHttpEvent({
      body: {
        moves: `1. e4 e6 2. d4 d5 3. Nd2 c5`,
        playerColor: 'black',
      },
    })

    const result = await handler(httpEvent)
    const body = result.body
    console.log(body)

    // expect(result.statusCode).toBe(200)
    // expect(body.boardBase64).toContain('=')
    // expect(body.quotient).toEqual(4)
  })
})
