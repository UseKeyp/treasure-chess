import { marketSales } from './marketSales'

describe('marketSales', () => {
  scenario('returns all marketSales', async (scenario) => {
    const result = await marketSales()

    expect(result.length).toEqual(Object.keys(scenario.marketSale).length)
  })
})
