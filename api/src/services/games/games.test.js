/* eslint-disable */
import { games, game } from './games'

const exampleGame = {
  id: '0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221', // Moves hash plus end time
  black: {
    type: '__Member',
    id: 'jschiarizzi',
  },
  white: {
    type: '__Member',
    id: 'erik',
  },
  winner: {
    type: '__Member',
    id: 'erik',
  },
  name: 'Erik crushes',
  cardColor: 'white', // white or black
  blackRating: 1500,
  whiteRating: 1400,
  blackMasterTitle: 'GM',
  timeControl: 500, // game length in seconds
  termination: 'Checkmate', // eg. "Checkmate"
  endTime: new Date('2021-08-24T21:17:15+0000'),
  event: 'Live Chess', // eg. "Live Chess"
  moves:
    '1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nf6 5. e5 Nfd7 6. c3 Nc6 7. Bd3 Qb6 8. O-O cxd4 9. cxd4 Nxd4 10. Nxd4 Qxd4 11. Nf3 Qb6 12. Qa4 a6 13. Qg4 g6 14. Bg5 Bg7 15. Rfe1 Nc5 16. Qd4 Nd7 17. Qf4 Nc5 18. Qd4 Nd7 19. Qc3 Qc5 20. Qd2 b5 21. Rac1 Qa7 22. Qb4 Bf8 23. Qa5 Qb6 24. Qxb6 Nxb6 25. Rc7 Nd7 26. Rec1 Bc5 27. b4 Bxf2+ 28. Kxf2 O-O 29. Be7 Re8 30. Bd6 Nb6 31. Ng5 Nc4 32. Nxf7 a5 33. Nh6+ Kh8 34. Be7 Rxe7 35. Rxe7 axb4 36. Ng4 Kg8 37. Bb1 d4 38. Kg3 Ra3+ 39. Kh4 Ra8 40. Rf1 1-0', // pgn moves
  moveCount: 89, // eg. "43"
  gameRuleVariant: 'Standard', // eg. "Standard" or "Chess960"
  outcome: 'white', // "white" or "black"
  externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
  opening: 'Scandinavian', // eg. "Queen's Gambit"
  achievements: 'win/play above 2200,queen side castle,mate with a bishop', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
}

describe('games', () => {
  scenario('returns all games', async (scenario) => {
    const result = await games()

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('returns a single game', async (scenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('creates a game', async (scenario) => {
    const result = await createGame({
      input: {
        id: 'String',
        blackId: scenario.game.two.blackId,
        whiteId: scenario.game.two.whiteId,
        name: 'String',
        updatedAt: '2021-08-25T21:34:37Z',
        cardColor: 'String',
        blackRating: 5203304,
        timeControl: 3831849,
        whiteRating: 3345481,
        termination: 'String',
        endTime: '2021-08-25T21:34:37Z',
        event: 'String',
        moves: 'String',
        moveCount: 82956,
        gameRuleVariant: 'String',
        winner: 'String',
        opening: 'String',
        achievements: 'String',
        mintedAt: '2021-08-25T21:34:37Z',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.blackId).toEqual(scenario.game.two.blackId)
    expect(result.whiteId).toEqual(scenario.game.two.whiteId)
    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual('2021-08-25T21:34:37Z')
    expect(result.cardColor).toEqual('String')
    expect(result.blackRating).toEqual(5203304)
    expect(result.timeControl).toEqual(3831849)
    expect(result.whiteRating).toEqual(3345481)
    expect(result.termination).toEqual('String')
    expect(result.endTime).toEqual('2021-08-25T21:34:37Z')
    expect(result.event).toEqual('String')
    expect(result.moves).toEqual('String')
    expect(result.moveCount).toEqual(82956)
    expect(result.gameRuleVariant).toEqual('String')
    expect(result.winner).toEqual('String')
    expect(result.opening).toEqual('String')
    expect(result.achievements).toEqual('String')
    expect(result.mintedAt).toEqual('2021-08-25T21:34:37Z')
  })

  scenario('updates a game', async (scenario) => {
    const original = await game({ id: scenario.game.one.id })
    const result = await updateGame({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a game', async (scenario) => {
    const original = await deleteGame({ id: scenario.game.one.id })
    const result = await game({ id: original.id })

    expect(result).toEqual(null)
  })
})
