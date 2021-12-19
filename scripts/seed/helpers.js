const rug = require('random-username-generator')
const { Wallet: EthersWallet } = require('@ethersproject/wallet')
const { id: sha3 } = require('@ethersproject/hash')
const filters = require('@treasure-chess/treasure-filters')
const achievementsCalculator = require('@treasure-chess/chess-achievements')
const parseGameFromChessDotCom = require('../../../api/src/lib/chessCom/gameParsing')
const realGames =  require("./realGames/jschiar-21-07.json")
const randomTitles = require('./randomQuotes.json')

const countries = [
  'DE',
  'US',
  'UK',
  'RU',
  'JP',
  'BR',
  'CH',
  'NW',
  'DN',
  'MX',
  'AU',
  'CA',
  'IN',
  'CZ',
  'HU',
  'NZ',
  'IC',
]
const titles = ['GM', 'IM', 'NM']

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateRandomMembers = (count) => {
  return Array(count)
    .fill(null)
    .map(() => {
      const randomUsername = rug.generate()
      const randomAddress = EthersWallet.createRandom().address
      let masterTitle
      if (Math.random() > 0.9) {
        masterTitle = titles[Math.floor(Math.random() * titles.length)]
      }
      return {
        id: randomIntFromInterval(10000, 50000).toString(),
        username: randomUsername,
        address: randomAddress,
        imageSrc: `https://ui-avatars.com/api/?name=${randomUsername}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        masterTitle,
      }
    })
}

const generateRandomTreasures = (count, highestTokenId, members) => {
  // TODO: Used real game data
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const ran1 = Math.floor(Math.random() * members.length)
      const ran2 = ran1 === members.length - 1 ? ran1 - 1 : ran1 + 1
      const black = members[ran1]
      const white = members[ran2]

      const winner = randomIntFromInterval(1, 2) > 1 ? black : white
      const minter = randomIntFromInterval(1, 2) > 1 ? black : white

      const realGame = realGames[randomIntFromInterval(0, 139)]
      const game = parseGameFromChessDotCom(realGame)
      console.log("quotes ",randomQuotes.length);
      const treasure = generateTreasureData({
        game,
        title: randomTitles[randomIntFromInterval(0, 140)].text,
        minter,
        white,
        black,
        owner: minter,
      })
      return { ...treasure, tokenId: highestTokenId + index + 1 }
    })
}

// const winnerRan = randomIntFromInterval(1, 2)
// const winner = winnerRan > 1 ? black : white
// const outcome = winnerRan > 1 ? 'black' : 'white'
// const minterRan = randomIntFromInterval(1, 2)
// const minter = minterRan > 1 ? black : white
// const cardColor = minterRan > 1 ? 'black' : 'white'
//
// const ratingDelta = randomIntFromInterval(0, 20)
// let blackRatingDelta = -ratingDelta
// let whiteRatingDelta = ratingDelta
// if (winner === black) {
//   whiteRatingDelta = -ratingDelta
//   blackRatingDelta = ratingDelta
// }
// return {
//   id: randomIntFromInterval(10000, 50000).toString(),
//   blackId: black.id,
//
//   whiteId: white.id,
//   winnerId: winner.id,
//   // NFT
//   minterId: minter.id,
//   ownerId: minter.id,
//   uriData: 'TODO!',
//   tokenUri: 'TODO!',
//   tokenId: highestTokenId + index + 1,
//   mintedAt: new Date('2021-08-24T21:17:16+0000'),
//   // --------------- STATE --------------
//   title: 'Erik crushes',
//   // cardColor: 'white', // white or black
//   cardColor, // white or black
//   blackRating: randomIntFromInterval(1200, 2300),
//   whiteRating: randomIntFromInterval(1200, 2300),
//   blackRatingDelta,
//   whiteRatingDelta,
//   blackMasterTitle: black.masterTitle,
//   whiteMasterTitle: white.masterTitle,
//   timeControl: '500', // game time variant
//   termination: 'Checkmate', // eg. "Checkmate"
//   endTime: new Date('2021-08-24T21:17:15+0000'),
//   outcome,
//   event: 'Live Chess', // eg. "Live Chess"
//   moves:
//   '1. e4 e6 2. d4 d5 3. Nd2 c5 4. Ngf3 Nf6 5. e5 Nfd7 6. c3 Nc6 7. Bd3 Qb6 8. O-O cxd4 9. cxd4 Nxd4 10. Nxd4 Qxd4 11. Nf3 Qb6 12. Qa4 a6 13. Qg4 g6 14. Bg5 Bg7 15. Rfe1 Nc5 16. Qd4 Nd7 17. Qf4 Nc5 18. Qd4 Nd7 19. Qc3 Qc5 20. Qd2 b5 21. Rac1 Qa7 22. Qb4 Bf8 23. Qa5 Qb6 24. Qxb6 Nxb6 25. Rc7 Nd7 26. Rec1 Bc5 27. b4 Bxf2+ 28. Kxf2 O-O 29. Be7 Re8 30. Bd6 Nb6 31. Ng5 Nc4 32. Nxf7 a5 33. Nh6+ Kh8 34. Be7 Rxe7 35. Rxe7 axb4 36. Ng4 Kg8 37. Bb1 d4 38. Kg3 Ra3+ 39. Kh4 Ra8 40. Rf1 1-0', // pgn moves
//   moveCount: 89, // eg. "43"
//   ruleVariant: 'Standard', // eg. "Standard" or "Chess960"
//   externalUrl: 'https://www.chess.com/game/daily/28103371', // Link to game on chess.com
//   opening: 'Scandinavian', // eg. "Queen's Gambit"
//   achievements: 'Mythic Winner,A Minor Problem,Criss Cross', // List eg. "win/play above 2200,queen side castle,mate with a bishop"
//   achievementScore: 14,
//   rarity: 'Mythic',
// }
export const generateTreasureData = async ({
  game,
  title,
  minter,
  owner,
  white,
  black,
}) => {
  const getTreasureCardColor = ({ game, username }) =>
    game.whiteUsername === username ? 'white' : 'black'

  const getTreasureId = ({
    moves, // String of moves from the PGN (without timestamps)
    endTime, // Timecode from chess.com API
    cardColor, // String of version of treasure: "white" or "black"
  }) => {
    const endTimeUnix = Date.parse(endTime) / 1000
    return sha3(`${moves} ${endTimeUnix} ${cardColor}`)
    // eg. sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6 1612749143 white")
  }

  const getRarity = (score) => {
    if (score < 6) return filters.rarityList[0]
    if (score < 11) return filters.rarityList[1]
    if (score < 14) return filters.rarityList[2]
    return filters.rarityList[3]
  }
  const cardColor = getTreasureCardColor({ game, username: minter.username })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  let winner
  if (game.winnerId) {
    winner = white
    if (game.outcome === 'black') winner = black
  }
  const { opening, score, achievements } = achievementsCalculator(
    game.pgn,
    cardColor
  )
  const achievementsString = achievements.map((item) => item.name).join(',')
  return {
    id: treasureId,
    blackId: black.id,
    whiteId: white.id,
    minterId: minter.id,
    ownerId: owner.id,
    winner,
    title,
    cardColor,
    blackRating: game.blackRating,
    whiteRating: game.whiteRating,
    blackRatingDelta: game.blackRatingDelta,
    whiteRatingDelta: game.whiteRatingDelta,
    blackMasterTitle: black.title,
    whiteMasterTitle: white.title,
    timeControl: game.timeControl,
    termination: game.termination,
    endTime: game.endTime,
    outcome: game.outcome,
    event: game.event,
    moves: game.moves,
    moveCount: game.moveCount,
    ruleVariant: game.ruleVariant,
    externalUrl: game.externalUrl,
    opening: game.opening,
    rarity: getRarity(score),
    achievements: achievementsString,
    achievementScore: score,
  }
}

module.exports = { generateRandomTreasures, generateRandomMembers }
