import { EnvelopError } from '@envelop/core'
import { listTreasure, unlistTreasure } from './marketSales'

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

describe('listTreasure', () => {
  scenario('Invalid amount', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
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
  scenario('Invalid member', async (scenario) => {
    mockCurrentUser({ id: 123, address: process.env.TEST_USER_PUBLIC_ADDRESS })
    try {
      await listTreasure({
        treasureId: scenario.treasure[0].id,
        amount: 1,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`You don't own this Treasure.`))
    }
  })
  // scenario('Already listed', async (scenario) => {
  //   // TODO
  // })
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

describe('listTreasure', () => {
  scenario('Invalid member', async (scenario) => {
    mockCurrentUser({ id: 123, address: process.env.TEST_USER_PUBLIC_ADDRESS })
    try {
      await unlistTreasure({
        treasureId: scenario.treasure[0].id,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`You don't own this Treasure.`))
    }
  })
  // scenario('Already listed', async (scenario) => {
  //   // TODO
  // })
  scenario('Happy case', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    await listTreasure({
      treasureId: scenario.treasure[0].id,
      amount: 1,
    })
    await unlistTreasure({
      treasureId: scenario.treasure[0].id,
      amount: 1,
    })
    try {
      await unlistTreasure({
        treasureId: scenario.treasure[0].id,
        amount: 1,
      })
    } catch (e) {
      expect(e).toStrictEqual(new EnvelopError(`This Treasure is not listed.`))
    }
  })
  scenario('Happy case', async (scenario) => {
    mockCurrentUser({
      id: scenario.treasure[0].ownerId,
      address: process.env.TEST_USER_PUBLIC_ADDRESS,
    })
    await listTreasure({
      treasureId: scenario.treasure[0].id,
      amount: 1,
    })
    const response = await unlistTreasure({
      treasureId: scenario.treasure[0].id,
      amount: 1,
    })
    expect(response.status).toBe('PENDING_DELISTED')
  })
})
