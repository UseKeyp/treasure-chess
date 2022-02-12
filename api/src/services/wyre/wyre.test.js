import { wyreDepositUrl, _wyreWithdrawUrl } from './wyre'
jest.setTimeout(20000)

describe('wyreDepositUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const url = await wyreDepositUrl()
    expect(typeof url === 'string').toBe(true)
  })
})

describe('wyreWithdrawUrl', () => {
  scenario('Happy case', async () => {
    // const url = await wyreWithdrawUrl()
    // console.log(url)
  })
})
