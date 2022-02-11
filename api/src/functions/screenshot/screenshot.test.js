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
    /* eslint-disable no-console */
    console.log(result)
    const buffer = await result.body
    console.log(buffer)
    fs.writeFile('deleteme.png', buffer, (e) => e && console.log(e))
    /* eslint-enable no-console */

    expect(result.statusCode).toBe(200)
  })
})
