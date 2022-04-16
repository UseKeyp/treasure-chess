import { mintWithCredit, pendingMintPurchases } from './mintPurchases'
import { generateRandomTreasures } from '../../../../scripts/seed/helpers'
import { PENDING } from 'src/lib/mintPurchases'

jest.setTimeout(60000)

const TEST_TREASURE = {
  id: 'abc123',
  name: 'String',
  cardColor: 'String',
  blackRating: 9784770,
  timeControl: 6843251,
  whiteRating: 9408717,
  termination: 'String',
  event: 'String',
  moves: 'String',
  moveCount: 3392811,
  ruleVariant: 'Standard',
  boardLayout:
    '{"a2":{"type":"p","color":"w"},"a7":{"type":"p","color":"b"},"b7":{"type":"p","color":"b"},"c2":{"type":"b","color":"w"},"c6":{"type":"p","color":"b"},"d4":{"type":"p","color":"w"},"d5":{"type":"p","color":"b"},"e3":{"type":"r","color":"b"},"f5":{"type":"b","color":"b"},"f6":{"type":"b","color":"w"},"f7":{"type":"p","color":"b"},"g2":{"type":"p","color":"w"},"g6":{"type":"n","color":"b"},"h1":{"type":"k","color":"w"},"h4":{"type":"p","color":"w"},"h6":{"type":"q","color":"b"},"h7":{"type":"k","color":"b"}}',
  winner: {
    id: '0',
    address: 'String8756755',
    username: 'Alice',
    rating: 9388552,
  },
  opening: 'QueensGambit',
  achievements: ['Player', 'Pawn Shy'],
  black: {
    id: '0',
    address: 'String8756755',
    username: 'Alice',
    rating: 9388552,
  },
  white: {
    id: '1',
    address: 'String218123',
    username: 'Bob',
    rating: 2625039,
  },
}
jest.mock('../../lib/mintPurchases', () => {
  const originalModule = jest.requireActual('../../lib/mintPurchases')
  return {
    ...originalModule,
    validateMintRequest: jest.fn(() => null),
  }
})
jest.mock('../../lib/web3/treasureMarket', () => ({
  checkAndSetMarketApprovals: jest.fn(() => null),
}))
jest.mock('../../lib/web3/airdrop', () => ({
  checkGasAndAirdrop: jest.fn(() => null),
}))
jest.mock('../../lib/games', () => ({
  fetchGame: jest.fn(() => ({
    ...TEST_TREASURE,
    tcn: 'mC0KfAZRlt90gv5QpFQGcuGAtA!Tbs6SvlYQuM3VMT0TlvSAjrASdlSEvpENoENUFNU3pv70ec86lu65vlTMutRJCJQJtHJBsy0YyI?8IO',
  })),
}))
jest.mock('../../lib/treasures', () => ({
  generateTreasureData: () => TEST_TREASURE,
}))

describe('Minting', () => {
  scenario('mintWithCredit', async (scenario) => {
    mockCurrentUser({
      ...scenario.member.alice,
      mintCredits: 1,
    })
    const game = generateRandomTreasures(1, 1, [
      scenario.member.alice,
      scenario.member.bob,
    ])[0]

    const { endTime, title } = game
    const result = await mintWithCredit({
      gameId: 'randomGameId',
      endTime,
      title,
    })
    // console.log(result)
    expect(result.status).toBe(PENDING)
  })
  scenario('pendingMintPurchases', async (scenario) => {
    mockCurrentUser(scenario.member.alice)
    const result = await pendingMintPurchases()
    expect(result.status).toBe(scenario.mintPurchase.one.status)
  })
})
