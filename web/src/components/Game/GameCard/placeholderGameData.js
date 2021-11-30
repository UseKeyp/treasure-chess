// Used to create the example card during the minting process
const placeholderGame = {
  id: '0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc222', // Moves hash plus end time
  whiteUsername: 'player1',
  winnerId: '41479298',
  blackUsername: 'player2',
  black: {
    imageSrc:
      'https://cssjs.chesscomfiles-4.com/bundles/web/images/noavatar_l.84a92436@2x.gif',
    country: 'XX',
  },
  white: {
    imageSrc:
      'https://cssjs.chesscomfiles-4.com/bundles/web/images/noavatar_l.84a92436@2x.gif',
    country: 'DE',
  },
  tokenId: 1,
  mintedAt: new Date('2021-08-24T21:17:16+0000'),
  // --------------- STATE --------------
  title: 'Example game',
  cardColor: 'black', // white or black
  blackRating: 1500,
  whiteRating: 1400,
  blackRatingDelta: -3,
  whiteRatingDelta: 3,
  blackMasterTitle: 'GM',
  whiteMasterTitle: undefined,
  timeControl: '500', // game time variant
  termination: 'Checkmate', // eg. "Checkmate"
  endTime: new Date('2021-08-24T21:17:15+0000'),
  outcome: 'white',
  event: 'Live Chess', // eg. "Live Chess"
  moveCount: 89, // eg. "43"
  ruleVariant: 'Standard', // eg. "Standard" or "Chess960"
  externalUrl: 'https://www.chess.com', // Link to game on chess.com
  opening: 'Scandinavian', // eg. "Queen's Gambit"
  achievementScore: 1,
  rarity: 'Mythic',
}
export default placeholderGame
