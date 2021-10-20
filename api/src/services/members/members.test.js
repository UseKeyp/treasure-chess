import {
  members,
  member,
  createMember,
  updateMember,
  deleteMember,
} from './members'

describe('members', () => {
  scenario('returns all members', async (scenario) => {
    const result = await members()

    expect(result.length).toEqual(Object.keys(scenario.member).length)
  })

  scenario('returns a single member', async (scenario) => {
    const result = await member({ id: scenario.member.one.id })

    expect(result).toEqual(scenario.member.one)
  })

  scenario('creates a member', async () => {
    const result = await createMember({
      input: {
        id: 'String',
        address: 'String6973540',
        rating: 8198066,
        imageSrc: 'String',
        country: 'String',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.address).toEqual('String6973540')
    expect(result.rating).toEqual(8198066)
    expect(result.imageSrc).toEqual('String')
    expect(result.country).toEqual('String')
  })

  scenario('updates a member', async (scenario) => {
    const original = await member({ id: scenario.member.one.id })
    const result = await updateMember({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a member', async (scenario) => {
    const original = await deleteMember({ id: scenario.member.one.id })
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
