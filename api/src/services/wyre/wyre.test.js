import { EnvelopError } from '@envelop/core'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import { wyreDepositUrl, wyreWithdrawUrl } from './wyre'
jest.setTimeout(20000)

describe('wyreDepositUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const url = await wyreDepositUrl()
    console.log(url)
    // expect(url).toStrictEqual(new EnvelopError(`Invalid amount.`))
  })
})

describe('wyreWithdrawUrl', () => {
  scenario('Happy case', async (scenario) => {
    // const url = await wyreWithdrawUrl()
    // console.log(url)
  })
})
