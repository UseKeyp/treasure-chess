import { listTreasure } from './marketSales'

jest.setTimeout(20000)

describe('listTreasure', () => {
  scenario('Invalid amount', async (scenario) => {
    mockCurrentUser({ id: scenario.member[0].id })
    // expect(
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: '0',
      })
    } catch (e) {
      console.log(e)
    }

    // ).toThrowError('Invalid amount.')
  })
  // scenario('Not the owner', async (scenario) => {
  //   mockCurrentUser({ id: 100 })
  //   expect(
  //     listTreasure({
  //       treasureId: scenario.treasure[0].id,
  //       amount: '0',
  //     })
  //   ).toThrowError("You don't own this Treasure.")
  // })
  // scenario('listTreasure', async (scenario) => {
  //   mockCurrentUser({ id: scenario.member[0].id })
  //   const result = await listTreasure({
  //     treasureId: scenario.treasure[0].id,
  //     amount: '0',
  //   })
  //   console.log(result)
  //   // expect(result.length).toEqual(Object.keys(scenario.marketSale).length)
  // })
})
