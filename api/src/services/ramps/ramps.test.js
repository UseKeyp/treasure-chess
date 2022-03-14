import { ramps } from './ramps'
jest.setTimeout(60000)
describe('Ramps', () => {
  scenario('ramps', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    await ramps()
    // console.log(response)
  })
})
