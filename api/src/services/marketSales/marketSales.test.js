import { EnvelopError } from '@envelop/core'
import { listTreasure } from './marketSales'

jest.setTimeout(20000)

describe('listTreasure', () => {
  scenario('Invalid amount', async (scenario) => {
    mockCurrentUser({ id: scenario.member[0].id })
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
  scenario.skip('Already listed', async (scenario) => {
    // TODO
  })
  scenario.skip('Happy case', async (scenario) => {
    // TODO
  })
})
