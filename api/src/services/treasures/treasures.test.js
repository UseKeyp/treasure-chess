import {
  treasures,
  treasure,
  createTreasure,
  updateTreasure,
  deleteTreasure,
} from './treasures'

import { generatedTreasures } from './treasures.mocks'

import { sortTreasuresByPrice } from '../../lib/treasures'

describe('sort treasures by price', () => {
  const HIGH_TO_LOW = 'Price: High to Low'
  const LOW_TO_HIGH = 'Price: Low to High'
  const isAscending = (sort) => (sort === 'Price: Low to High' ? true : false)

  const pricesAscendingResult = [
    1, 1, 1, 2, 2, 3, 5, 9, 12, 13, 13, 14, 15, 19, 20, 36, 37, 95, 177, 567,
  ]
  const pricesDescendingResult = [
    567, 177, 95, 37, 36, 20, 19, 15, 14, 13, 13, 12, 9, 5, 3, 2, 2, 1, 1, 1,
  ]

  it('should ascending sort', async () => {
    const resultB = sortTreasuresByPrice(
      generatedTreasures,
      isAscending(LOW_TO_HIGH)
    ).map((treasure) => treasure.marketSales.amount)

    expect(resultB).toEqual(pricesAscendingResult)
  })
  it('should descending sort', async () => {
    const resultA = sortTreasuresByPrice(
      generatedTreasures,
      isAscending(HIGH_TO_LOW)
    ).map((treasure) => treasure.marketSales.amount)
    expect(resultA).toEqual(pricesDescendingResult)
  })
})

// describe('treasures', () => {
//   scenario('returns all treasures', async (scenario) => {
//     const result = await treasures()

//     expect(result.length).toEqual(Object.keys(scenario.treasure).length)
//   })

//   scenario('returns a single treasure', async (scenario) => {
//     const result = await treasure({ id: scenario.treasure.one.id })

//     expect(result).toEqual(scenario.treasure.one)
//   })

//   scenario('creates a treasure', async (scenario) => {
//     const result = await createTreasure({
//       input: {
//         id: 'String',
//         blackId: scenario.treasure.two.blackId,
//         whiteId: scenario.treasure.two.whiteId,
//         name: 'String',
//         updatedAt: '2021-08-25T21:34:37Z',
//         cardColor: 'String',
//         blackRating: 5203304,
//         timeControl: 3831849,
//         whiteRating: 3345481,
//         termination: 'String',
//         endTime: '2021-08-25T21:34:37Z',
//         event: 'String',
//         moves: 'String',
//         moveCount: 82956,
//         gameRuleVariant: 'String',
//         winner: 'String',
//         opening: 'String',
//         achievements: 'String',
//         mintedAt: '2021-08-25T21:34:37Z',
//       },
//     })

//     expect(result.id).toEqual('String')
//     expect(result.blackId).toEqual(scenario.treasure.two.blackId)
//     expect(result.whiteId).toEqual(scenario.treasure.two.whiteId)
//     expect(result.name).toEqual('String')
//     expect(result.updatedAt).toEqual('2021-08-25T21:34:37Z')
//     expect(result.cardColor).toEqual('String')
//     expect(result.blackRating).toEqual(5203304)
//     expect(result.timeControl).toEqual(3831849)
//     expect(result.whiteRating).toEqual(3345481)
//     expect(result.termination).toEqual('String')
//     expect(result.endTime).toEqual('2021-08-25T21:34:37Z')
//     expect(result.event).toEqual('String')
//     expect(result.moves).toEqual('String')
//     expect(result.moveCount).toEqual(82956)
//     expect(result.gameRuleVariant).toEqual('String')
//     expect(result.winner).toEqual('String')
//     expect(result.opening).toEqual('String')
//     expect(result.achievements).toEqual('String')
//     expect(result.mintedAt).toEqual('2021-08-25T21:34:37Z')
//   })

//   scenario('updates a treasure', async (scenario) => {
//     const original = await treasure({ id: scenario.treasure.one.id })
//     const result = await updateTreasure({
//       id: original.id,
//       input: { id: 'String2' },
//     })

//     expect(result.id).toEqual('String2')
//   })

//   scenario('deletes a treasure', async (scenario) => {
//     const original = await deleteTreasure({ id: scenario.treasure.one.id })
//     const result = await treasure({ id: original.id })

//     expect(result).toEqual(null)
//   })
// })
