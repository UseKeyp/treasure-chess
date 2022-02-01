import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './metrics'

describe('metrics function', () => {
  it('Should respond with 200', async () => {
    const httpEvent = mockHttpEvent({})

    const response = await handler(httpEvent, null)
    const { data } = JSON.parse(response.body)
    // prometheus metrics
    // console.log(data.promData)

    // Business logic metrics
    // Object.keys(data.businessData).map((key) =>
    //   console.log(data.businessData[key])
    // )
    expect(response.statusCode).toBe(200)
    expect(typeof data).toBe('object')
  })
})
