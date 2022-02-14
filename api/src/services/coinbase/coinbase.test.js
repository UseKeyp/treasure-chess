import { coinbaseLoginUrl } from 'coinbase'
jest.setTimeout(20000)

describe('coinbaseLoginUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const { url } = await coinbaseLoginUrl()
    /* eslint-disable no-console */
    console.log(url)
    console.log(url.href.split('&'))
    expect(typeof url === 'string').toBe(true)
  })
})
