import { EnvelopError } from '@envelop/core'
import { listTreasure, unlistTreasure, buyTreasure } from './marketSales'

jest.setTimeout(20000)
jest.mock('../../lib/torus/torus', () => {
  return {
    getTorusWallet: jest.fn(() => ({
      publicAddress: process.env.TEST_USER_PUBLIC_ADDRESS,
      privateKey: process.env.TEST_USER_PRIVATE_KEY,
    })),
  }
})
jest.mock('../../lib/web3/airdrop/airdrop', () => {
  return {
    airdropGasTransaction: jest.fn(() => null),
  }
})
jest.mock('../../lib/web3/member', () => {
  return {
    memberSendTransaction: jest.fn(() => ({
      hash: `0x56570de287d73cd1cb6092bb8fdee6173974955fdef345ae579ee9f475ea${Math.floor(
        Math.random() * (9999 - 1000 + 1) + 1000
      )}`,
    })),
  }
})
jest.mock('../../lib/web3/tokens', () => {
  return {
    getUsdcBalance: jest.fn((address) => {
      if (address === process.env.TEST_USER_PUBLIC_ADDRESS) return '100.0'
      return '0'
    }),
  }
})

// NOTE: alice and bob own all the treasures
describe('listTreasure', () => {
  scenario('Invalid amount', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: scenario.member.alice.address,
    })
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: '0',
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`Invalid amount.`))
    }
  })
  scenario('Not owner', async (scenario) => {
    mockCurrentUser({ id: 1111, address: scenario.member.alice.address })
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: 1,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`You don't own this Treasure.`))
    }
  })
  scenario('Already listed', async (scenario) => {
    mockCurrentUser({ id: scenario.treasure[1].ownerId })
    try {
      await listTreasure({
        treasureId: scenario.treasure[1].id,
        amount: 1,
      })
    } catch (e) {
      expect(e).toStrictEqual(
        new EnvelopError(`This Treasure is already listed.`)
      )
    }
  })
  scenario('Happy case', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    const response = await listTreasure({
      treasureId: scenario.treasure[0].id,
      amount: 1,
    })
    expect(response.status).toBe('PENDING_LISTED')
  })
})

describe('unlistTreasure', () => {
  scenario('Not owner', async (scenario) => {
    mockCurrentUser({ id: 123, address: process.env.TEST_USER_PUBLIC_ADDRESS })
    try {
      await unlistTreasure({
        treasureId: scenario.treasure[1].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`You don't own this Treasure.`))
    }
  })
  scenario('Not listed', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    try {
      await unlistTreasure({
        treasureId: scenario.treasure[0].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`This Treasure is not listed.`))
    }
  })
  scenario('Pending listing', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: 1,
      })
      await unlistTreasure({
        treasureId: scenario.treasure[0].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`This Treasure is not listed.`))
    }
  })
  scenario('Happy case', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[1].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    const response = await unlistTreasure({
      treasureId: scenario.treasure[1].id,
    })
    expect(response.status).toBe('PENDING_DELISTED')
  })
})

describe('buyTreasure', () => {
  scenario('Cannot buy own treasure', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[1].ownerId,
    })
    try {
      await buyTreasure({
        treasureId: scenario.treasure[1].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(
        new EnvelopError(`You cannot buy your own Treasure.`)
      )
    }
  })
  scenario('Not for sale', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
    })
    try {
      await buyTreasure({
        treasureId: scenario.treasure[0].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(
        new EnvelopError(`This Treasure is not for sale.`)
      )
    }
  })
  scenario('Not enough funds', async (scenario) => {
    mockCurrentUser({
      id: scenario.member.carol.id,
      address: scenario.member.carol.address,
    })
    try {
      await buyTreasure({
        treasureId: scenario.treasure[1].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(
        new EnvelopError(
          `You don't have enough funds to purchase this Treasure.`
        )
      )
    }
  })
  scenario('Happy case', async (scenario) => {
    mockCurrentUser({
      id: scenario.member.carol.id,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    const response = await buyTreasure({
      treasureId: scenario.treasure[1].id,
    })
    expect(response.status).toBe('PENDING_SOLD')
  })
})
