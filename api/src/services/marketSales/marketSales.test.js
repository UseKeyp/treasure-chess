import { listTreasure } from './marketSales'

describe('marketSales', () => {
  scenario('listTreasure', async (scenario) => {
    const result = await listTreasure({
      treasureId: scenario.treasure.create.id,
    })
    console.log(result)
    // expect(result.length).toEqual(Object.keys(scenario.marketSale).length)
  })
})
