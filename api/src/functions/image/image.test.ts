/* eslint-disable */
import { mockHttpEvent } from '@redwoodjs/testing/api'
import { handler } from './image'
import fs from 'fs'

describe('image serverless function', () => {
  it('board image from moves', async () => {
    const httpEvent = mockHttpEvent({
      body: JSON.stringify({
        moves: `1. e4 e6 2. d4 d5 3. Nd2 c5`,
        playerColor: 'black',
      }),
    })

    const result = await handler(httpEvent)
    const buffer = await result.body
    fs.writeFile('deleteme.png', buffer, (e) => e && console.log(e))

    expect(result.statusCode).toBe(200)
  })
  it('board image from boardLayout', async () => {
    const httpEvent = mockHttpEvent({
      body: JSON.stringify({
        boardLayout: {
          a3: { type: 'p', color: 'w' },
          a7: { type: 'p', color: 'b' },
          a8: { type: 'r', color: 'b' },
          b2: { type: 'p', color: 'w' },
          b6: { type: 'p', color: 'b' },
          b8: { type: 'n', color: 'b' },
          c2: { type: 'q', color: 'b' },
          c5: { type: 'p', color: 'b' },
          d1: { type: 'r', color: 'w' },
          d4: { type: 'p', color: 'w' },
          d5: { type: 'b', color: 'b' },
          d6: { type: 'p', color: 'b' },
          e1: { type: 'k', color: 'w' },
          e2: { type: 'p', color: 'w' },
          e5: { type: 'p', color: 'b' },
          e8: { type: 'k', color: 'b' },
          f1: { type: 'b', color: 'w' },
          f2: { type: 'p', color: 'w' },
          f7: { type: 'p', color: 'b' },
          f8: { type: 'b', color: 'b' },
          g1: { type: 'n', color: 'w' },
          g2: { type: 'p', color: 'w' },
          g3: { type: 'q', color: 'w' },
          g7: { type: 'p', color: 'b' },
          g8: { type: 'n', color: 'b' },
          h1: { type: 'r', color: 'w' },
          h2: { type: 'p', color: 'w' },
          h7: { type: 'p', color: 'b' },
          h8: { type: 'r', color: 'b' },
        },
        playerColor: 'black',
      }),
    })

    const result = await handler(httpEvent)
    console.log(result)

    const buffer = result.body
    fs.writeFile('deleteme.png', buffer, (e) => e && console.log(e))

    expect(result.statusCode).toBe(200)
  })
})
