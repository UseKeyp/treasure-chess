import {
  promotions,
  promotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from './promotions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('promotions', () => {
  scenario('returns all promotions', async (scenario) => {
    const result = await promotions()

    expect(result.length).toEqual(Object.keys(scenario.promotion).length)
  })

  scenario('returns a single promotion', async (scenario) => {
    const result = await promotion({ id: scenario.promotion.one.id })

    expect(result).toEqual(scenario.promotion.one)
  })

  scenario('creates a promotion', async () => {
    const result = await createPromotion({
      input: { updatedAt: '2022-05-10T01:36:23Z', type: 'TWITCH_CONNECTION' },
    })

    expect(result.updatedAt).toEqual('2022-05-10T01:36:23Z')
    expect(result.type).toEqual('TWITCH_CONNECTION')
  })

  scenario('updates a promotion', async (scenario) => {
    const original = await promotion({ id: scenario.promotion.one.id })
    const result = await updatePromotion({
      id: original.id,
      input: { updatedAt: '2022-05-11T01:36:23Z' },
    })

    expect(result.updatedAt).toEqual('2022-05-11T01:36:23Z')
  })

  scenario('deletes a promotion', async (scenario) => {
    const original = await deletePromotion({ id: scenario.promotion.one.id })
    const result = await promotion({ id: original.id })

    expect(result).toEqual(null)
  })
})
