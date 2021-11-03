import { mintPurchases } from './mintPurchases'

describe('mintPurchases', () => {
  scenario('returns all mintPurchases', async (scenario) => {
    const result = await mintPurchases()

    expect(result.length).toEqual(Object.keys(scenario.mintPurchase).length)
  })
})
