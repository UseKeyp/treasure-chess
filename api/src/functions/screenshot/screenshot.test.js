import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './screenshot'
import fs from 'fs'
jest.setTimeout(20000)
describe('metrics function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        url: 'https://chess.mypinata.cloud/ipfs/QmPFGa2EwbZhf8AmP91TbfBXgoKSg5SjWnTBbuY3jH21vj?static=true',
      },
    })

    const result = await handler(httpEvent)
    console.log(result)
    const base64 = await result.body
    console.log(base64)
    fs.writeFile('deleteme.png', base64, (e) => e && console.log(e))

    expect(result.statusCode).toBe(200)
  })
})
