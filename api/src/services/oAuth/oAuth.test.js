import { oAuthUrl } from './oAuth'
import { COINBASE } from 'src/lib/oAuth'
jest.setTimeout(20000)

describe('coinbaseLoginUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const { url } = await oAuthUrl({ type: COINBASE })
    /* eslint-disable no-console */
    console.log(url)
    console.log(url.split('&'))
    expect(typeof url === 'string').toBe(true)
  })
})
