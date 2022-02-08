import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './screenshot'
import fs from 'fs'

describe('metrics function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        url: 'https://ipfs.io/ipfs/QmPFGa2EwbZhf8AmP91TbfBXgoKSg5SjWnTBbuY3jH21vj',
      },
    })

    const response = await handler(httpEvent)
    console.log(response)
    console.log(response.body)
    const body = response.body

    fs.writeFile('deleteme.png', body, (e) => e && console.log(e))

    expect(response.statusCode).toBe(200)
    expect(typeof data).toBe('object')
  })
})
