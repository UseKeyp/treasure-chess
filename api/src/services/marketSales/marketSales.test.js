import { EnvelopError } from '@envelop/core'
import { listTreasure } from './marketSales'

jest.setTimeout(20000)
jest.mock('../../lib/torus/torus', () => {
  return {
    getTorusWallet: jest.fn(() => ({
      publicAddress: process.env.TEST_USER_PUBLIC_ADDRESS,
      privateKey: process.env.TEST_USER_PRIVATE_KEY,
    })),
  }
})

describe('listTreasure', () => {
  scenario('Invalid amount', async (scenario) => {
    mockCurrentUser({ id: scenario.treasure[0].ownerId })
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: '0',
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`Invalid amount.`))
    }
  })
  scenario('Invalid member', async (scenario) => {
    mockCurrentUser({ id: 123 })
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: 1,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`You don't own this Treasure.`))
    }
  })
  // scenario('Already listed', async (scenario) => {
  //   // TODO
  // })
  scenario('Happy case', async (scenario) => {
    mockCurrentUser({ id: scenario.treasure[0].ownerId })
    const response = await listTreasure({
      treasureId: scenario.treasure[0].id,
      amount: 1,
    })
    expect(response.status).toBe('PENDING_LISTED')
  })
})
