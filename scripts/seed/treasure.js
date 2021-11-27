const members = require('./member')
const [alice, bob, carl] = members

const treasureData = [
  {
    id: '0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc222', // Moves hash plus end time
    black: {
      connect: { id: alice.id },
    },
    white: {
      connect: { id: bob.id },
    },
    winner: { connect: { id: bob.id } },
    // NFT
    minter: {
      connect: { id: bob.id },
    },
    owner: {
      connect: { id: bob.id },
    },
    uriData: 'TODO!',
    tokenId: 1,
    mintedAt: new Date('2021-08-24T21:17:16+0000'),
    // --------------- STATE --------------
    title: 'Erik crushes',
    // cardColor: 'white', // white or black
    cardColor: 'black', // white or black
    blackRating: 1500,
    whiteRating: 1400,
    blackRatingDelta: -3,
    whiteRatingDelta: 3,
    blackMasterTitle: alice.masterTitle,
    whiteMasterTitle: bob.masterTitle,
    timeControl: '500', // game time variant
    termination: 'Checkmate', // eg. "Checkmate"
    endTime: new Date('2021-08-24T21:17:15+0000'),
    outcome: 'white',
    event: 'Live Chess', // eg. "Live Chess"
    moves:
      '1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nf6 5. e5 Nfd7 6. c3 Nc6 7. Bd3 Qb6 8. O-O cxd4 9. cxd4 Nxd4 10. Nxd4 Qxd4 11. Nf3 Qb6 12. Qa4 a6 13. Qg4 g6 14. Bg5 Bg7 15. Rfe1 Nc5 16. Qd4 Nd7 17. Qf4 Nc5 18. Qd4 Nd7 19. Qc3 Qc5 20. Qd2 b5 21. Rac1 Qa7 22. Qb4 Bf8 23. Qa5 Qb6 24. Qxb6 Nxb6 25. Rc7 Nd7 26. Rec1 Bc5 27. b4 Bxf2+ 28. Kxf2 O-O 29. Be7 Re8 30. Bd6 Nb6 31. Ng5 Nc4 32. Nxf7 a5 33. Nh6+ Kh8 34. Be7 Rxe7 35. Rxe7 axb4 36. Ng4 Kg8 37. Bb1 d4 38. Kg3 Ra3+ 39. Kh4 Ra8 40. Rf1 1-0', // pgn moves
    moveCount: 89, // eg. "43"
    ruleVariant: 'Standard', // eg. "Standard" or "Chess960"
    externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
    opening: 'Scandinavian', // eg. "Queen's Gambit"
    achievements: 'Mythic Winner,A Minor Problem,Criss Cross', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
    achievementScore: 14,
    rarity: 'Mythic',
  },
  {
    id: '0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221', // Moves hash plus end time
    black: {
      connect: { id: alice.id },
    },
    white: {
      connect: { id: bob.id },
    },
    winner: { connect: { id: bob.id } },
    // NFT
    minter: {
      connect: { id: bob.id },
    },
    owner: {
      connect: { id: bob.id },
    },
    uriData: 'TODO!',
    tokenId: 2,
    mintedAt: new Date('2021-08-24T21:17:16+0000'),
    // --------------- STATE --------------
    title: 'Erik crushes',
    cardColor: 'black', // white or black
    blackRating: 1500,
    blackRatingDelta: -4,
    whiteRating: 1400,
    whiteRatingDelta: 4,
    blackMasterTitle: alice.masterTitle,
    whiteMasterTitle: bob.masterTitle,
    timeControl: '500', // game time variant
    termination: 'Checkmate', // eg. "Checkmate"
    endTime: new Date('2021-08-24T21:17:15+0000'),
    outcome: 'white',
    event: 'Live Chess', // eg. "Live Chess"
    moves:
      '1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nf6 5. e5 Nfd7 6. c3 Nc6 7. Bd3 Qb6 8. O-O cxd4 9. cxd4 Nxd4 10. Nxd4 Qxd4 11. Nf3 Qb6 12. Qa4 a6 13. Qg4 g6 14. Bg5 Bg7 15. Rfe1 Nc5 16. Qd4 Nd7 17. Qf4 Nc5 18. Qd4 Nd7 19. Qc3 Qc5 20. Qd2 b5 21. Rac1 Qa7 22. Qb4 Bf8 23. Qa5 Qb6 24. Qxb6 Nxb6 25. Rc7 Nd7 26. Rec1 Bc5 27. b4 Bxf2+ 28. Kxf2 O-O 29. Be7 Re8 30. Bd6 Nb6 31. Ng5 Nc4 32. Nxf7 a5 33. Nh6+ Kh8 34. Be7 Rxe7 35. Rxe7 axb4 36. Ng4 Kg8 37. Bb1 d4 38. Kg3 Ra3+ 39. Kh4 Ra8 40. Rf1 1-0', // pgn moves
    moveCount: 89, // eg. "43"
    ruleVariant: 'Standard', // eg. "Standard" or "Chess960"
    externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
    opening: 'Scandinavian', // eg. "Queen's Gambit"
    achievements:
      'Win a game,Win a game against opponent rated 750+,Mate with a bishop', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
    achievementScore: 2,
    rarity: 'Common',
  },
  // old games, needs updating too
  // {
  //   id: '0x99996b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221', // Moves hash plus end time
  //   black: {
  //     connect: { id: 'jschiarizzi' },
  //   },
  //   white: {
  //     connect: { id: 'erik' },
  //   },
  //   minter: {
  //     connect: { address: '0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab' },
  //   },
  //   owner: {
  //     connect: { address: '0x33f6ba34A34d24885DFE166891A4A8FB83643105' },
  //   },
  //   outcome: 'draw', // "white" or "black" or "Draw"
  //   name: 'Fair fight',
  //   cardColor: 'white', // white or black
  //   blackRating: 1500,
  //   whiteRating: 1400,
  //   blackMasterTitle: 'GM',
  //   timeControl: 500, // game time variant
  //   termination: 'Checkmate', // eg. "Checkmate"
  //   endTime: new Date('2021-08-25T21:17:15+0000'),
  //   event: 'Live Chess', // eg. "Live Chess"
  //   moves:
  //     '1. Nf3 d6 2. Nc3 g6 3. e4 Bg7 4. Bc4 Nf6 5. d4 O-O 6. O-O a6 7. a4 c5 8. dxc5 dxc5 9. Be3 b6 10. Qd2 Qc7 11. Bh6 Rd8 12. Qc1 Bb7 13. e5 Ng4 14. Bxg7 Kxg7 15. Qf4 f5 16. h3 Nh6 17. Ng5 Bc8 18. Be6 Rd4 19. Qh2 Bb7 20. Bxf5 Kh8 21. Be4 Bxe4 22. Ne6 Qb7 23. Qf4 Bf5 24. Nxd4 cxd4 25. Qxh6 Nc6 26. Ne2 Bxc2 27. Qd2 d3 28. Nc1 Rd8 29. f4 a5 30. f5 Nxe5 31. fxg6 Nxg6 32. Rf7 Qd5 33. Rf3 Ne5 34. Rf5 Qe4 35. Qf2 Rg8 36. Rf8 Nc4 37. Rxg8+ Kxg8 38. Qg3+ Kf7 39. b3 Qe3+ 40. Qxe3 Nxe3 41. Nxd3 Bxd3 42. Rc1 Bf5 43. Rc3 Nd5 44. Rf3 Ke6 45. g4 Bg6 46. h4 Be4 47. Rg3 Ke5 48. h5 Kf4 49. Kh2 Ne3 50. Kh3 Bc2 51. g5 Bxb3 52. g6 hxg6 53. Rxg6 Bf7 54. Rxb6 Bxh5 55. Rb5 Bg4+ 56. Kh2 Nc4 57. Kg2 Be2 58. Kf2 Bd3 59. Rd5 Ke4 60. Rb5 Kd4 61. Ke1 Bc2 62. Rg5 e5 63. Ke2 Bxa4 64. Rxe5 Nxe5 65. Kd2 Bb5 66. Kc2 Nf3 67. Kb3 Kc5 68. Ka3 Kc4 69. Kb2 Kb4 70. Ka2 Bc4+ 71. Kb2 Ne5 72. Ka1 Kb3 73. Kb1 Kc3 74. Ka1 Nd3 75. Kb1 Nb4 76. Kc1 Ba2 77. Kd1 Kd3 78. Kc1 Kc3 79. Kd1 Bc4 80. Ke1 Kd3 81. Kf2 Ke4 82. Kg3 Be6 83. Kh2 Kf3 84. Kh1 Nd3 85. Kg1 Bh3 86. Kh2 Nf4 87. Kg1 Kg3 88. Kh1 Bg2+ 89. Kg1 Ne2# 0-1', // pgn moves
  //   moveCount: 89, // eg. "43"
  //   gameRuleVariant: 'Standard', // eg. "Standard" or "Chess960"
  //   externalUrl: 'https://www.chess.com/game/daily/29358096', // Link to game on chess.com
  //   opening: 'Queens Gambit', // eg. "Queen's Gambit"
  //   achievements: 'win/play above 2200,queen side castle,mate with a bishop', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
  //   tokenId: 25,
  //   mintedAt: new Date('2021-08-25T21:17:16+0000'),
  // },
  // {
  //   id: '0x88886b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc221', // Moves hash plus end time
  //   black: {
  //     connect: { id: 'jschiarizzi' },
  //   },
  //   white: {
  //     connect: { id: 'erik' },
  //   },
  //   minter: {
  //     connect: { address: '0xe4b420F15d6d878dCD0Df7120Ac0fc1509ee9Cab' },
  //   },
  //   owner: {
  //     connect: { address: '0x33f6ba34A34d24885DFE166891A4A8FB83643105' },
  //   },
  //   winner: {
  //     connect: {
  //       id: 'jschiarizzi',
  //     },
  //   },
  //   name: 'Best game ever',
  //   outcome: 'black', // "white" or "black"
  //   cardColor: 'white', // white or black
  //   blackRating: 1500,
  //   whiteRating: 1400,
  //   blackMasterTitle: 'GM',
  //   timeControl: 500, // game time variant
  //   termination: 'Checkmate', // eg. "Checkmate"
  //   endTime: new Date('2021-08-26T21:17:15+0000'),
  //   event: 'Live Chess', // eg. "Live Chess"
  //   moves:
  //     '1. Nf3 d6 2. Nc3 g6 3. e4 Bg7 4. Bc4 Nf6 5. d4 O-O 6. O-O a6 7. a4 c5 8. dxc5 dxc5 9. Be3 b6 10. Qd2 Qc7 11. Bh6 Rd8 12. Qc1 Bb7 13. e5 Ng4 14. Bxg7 Kxg7 15. Qf4 f5 16. h3 Nh6 17. Ng5 Bc8 18. Be6 Rd4 19. Qh2 Bb7 20. Bxf5 Kh8 21. Be4 Bxe4 22. Ne6 Qb7 23. Qf4 Bf5 24. Nxd4 cxd4 25. Qxh6 Nc6 26. Ne2 Bxc2 27. Qd2 d3 28. Nc1 Rd8 29. f4 a5 30. f5 Nxe5 31. fxg6 Nxg6 32. Rf7 Qd5 33. Rf3 Ne5 34. Rf5 Qe4 35. Qf2 Rg8 36. Rf8 Nc4 37. Rxg8+ Kxg8 38. Qg3+ Kf7 39. b3 Qe3+ 40. Qxe3 Nxe3 41. Nxd3 Bxd3 42. Rc1 Bf5 43. Rc3 Nd5 44. Rf3 Ke6 45. g4 Bg6 46. h4 Be4 47. Rg3 Ke5 48. h5 Kf4 49. Kh2 Ne3 50. Kh3 Bc2 51. g5 Bxb3 52. g6 hxg6 53. Rxg6 Bf7 54. Rxb6 Bxh5 55. Rb5 Bg4+ 56. Kh2 Nc4 57. Kg2 Be2 58. Kf2 Bd3 59. Rd5 Ke4 60. Rb5 Kd4 61. Ke1 Bc2 62. Rg5 e5 63. Ke2 Bxa4 64. Rxe5 Nxe5 65. Kd2 Bb5 66. Kc2 Nf3 67. Kb3 Kc5 68. Ka3 Kc4 69. Kb2 Kb4 70. Ka2 Bc4+ 71. Kb2 Ne5 72. Ka1 Kb3 73. Kb1 Kc3 74. Ka1 Nd3 75. Kb1 Nb4 76. Kc1 Ba2 77. Kd1 Kd3 78. Kc1 Kc3 79. Kd1 Bc4 80. Ke1 Kd3 81. Kf2 Ke4 82. Kg3 Be6 83. Kh2 Kf3 84. Kh1 Nd3 85. Kg1 Bh3 86. Kh2 Nf4 87. Kg1 Kg3 88. Kh1 Bg2+ 89. Kg1 Ne2# 0-1', // pgn moves
  //   moveCount: 89, // eg. "43"
  //   gameRuleVariant: 'Standard', // eg. "Standard" or "Chess960"
  //   externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
  //   opening: 'Scandinavian', // eg. "Queen's Gambit"
  //   achievements: 'win/play above 2200,queen side castle,mate with a bishop', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
  //   tokenId: 26,
  //   mintedAt: new Date('2021-08-26T21:17:16+0000'),
  // },
]
module.exports = treasureData
