// Used to create the example card during the minting process
const placeholderGame = {
  id: '0x51a46b84b32f78e00f69e0df78f0b5d391f878c46926f91c9aa02f185bebc222', // Moves hash plus end time
  winnerUsername: 'treasure_joseph',
  winnerId: '41479298',
  blackUsername: 'treasure_joseph',
  black: {
    imageSrc:
      'https://images.chesscomfiles-4.com/uploads/v1/user/41479298.3d21e1ba.200x200o.7b825295a3d5.jpeg',
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
  cardColor: 'white', // white or black
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
  externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
  opening: 'Scandinavian', // eg. "Queen's Gambit"
  achievements: 'Mythic Winner,A Minor Problem,Criss Cross', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
  achievementScore: 14,
  rarity: 'Mythic',
}
export default placeholderGame
