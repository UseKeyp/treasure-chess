import { listTreasure } from './marketSales'

jest.setTimeout(20000)

describe('marketSales', () => {
  scenario('listTreasure', async (scenario) => {
    console.log(scenario.treasure)
    const result = await listTreasure({
      treasureId: scenario.treasure[0].id,
    })
    // console.log(result)
    // expect(result.length).toEqual(Object.keys(scenario.marketSale).length)
  })
})
