import { wyreDepositUrl, _wyreWithdrawUrl } from './wyre'
import { createPaymentMethod, fetchPaymentMethod } from 'src/lib/wyre'
jest.setTimeout(20000)

describe('src/lib/wyre', () => {
  let paymentMethodId
  // TODO: I think you have to create a user first, before creating a PM this way.
  scenario('Create a Payment Method', async () => {
    const details = {
      country: 'US',
      currency: 'USD',
      beneficiaryType: 'INDIVIDUAL',
      firstNameOnAccount: 'Sally',
      lasNameOnAccount: 'Smith',
      accountNumber: '1234567890123',
      routingNumber: '123412312',
      accountType: 'CHECKING',
    }
    const response = await createPaymentMethod(details)
    // console.log(response)
    paymentMethodId = response.payment_id
    // expect(typeof url === 'string').toBe(true)
  })
  scenario('Fetch a Payment Method', async () => {
    await fetchPaymentMethod(paymentMethodId)
    // console.log(response)
    // expect(typeof url === 'string').toBe(true)
  })

  // NOTE: tests for the plaid PM is in oAuth.test.js
})
describe('wyreDepositUrl', () => {
  scenario('Happy case', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const url = await wyreDepositUrl()
    expect(typeof url === 'string').toBe(true)
  })
})

// describe('wyreWithdrawUrl', () => {
//   scenario('Create payment method', async () => {
//     // const url = await wyreWithdrawUrl()
//     // console.log(url)
//   })
// })
