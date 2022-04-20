import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './prerender'
import { db } from 'src/lib/db'
import fs from 'fs'

describe('prerender function', () => {
  it('Happy case', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        tokenId: 1001,
      },
    })
    const result = await handler(httpEvent)
    console.log(result)
    const buffer = await result.body
    fs.writeFile('prerender.deleteme.html', buffer, (e) => e && console.log(e))
    expect(result.statusCode).toBe(200)
  })
})
