import { transactions } from './transactions'

describe('transactions', () => {
  scenario('returns all transactions', async (scenario) => {
    const result = await transactions()

    expect(result.length).toEqual(Object.keys(scenario.transaction).length)
  })
})
