import { wyreDepositUrl, wyreWithdrawUrl } from './wyre'
jest.setTimeout(20000)

describe('wyreDepositUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const url = await wyreDepositUrl()
    // expect(url).toStrictEqual(new EnvelopError(`Invalid amount.`))
  })
})

describe('wyreWithdrawUrl', () => {
  scenario('Happy case', async () => {
    // const url = await wyreWithdrawUrl()
    // console.log(url)
  })
})
