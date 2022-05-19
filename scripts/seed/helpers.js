const rug = require('random-username-generator')
const { Wallet: EthersWallet } = require('@ethersproject/wallet')
const { id: sha3 } = require('@ethersproject/hash')
const filters = require('@treasure-chess/treasure-filters').default
const achievementsCalculator = require('@treasure-chess/chess-achievements')
const {
  parseGameFromChessDotCom,
} = require('../../api/src/lib/chessCom/gameParsing')
const { getGifUrl } = require('../../api/src/lib/chessCom/gifGetter')
const { Chess } = require('chess.js')

const realGames = require('./data/realGames.json')
const randomTitles = require('./data/randomTitles.json')
const randomAvatarsBase64 = require('./data/randomAvatarsBase64.js')
const countries = require('./data/countries')
const deltaRating = require('./data/deltaData.json')

const getBoardLayout = (pgn) => {
  const chess = new Chess()
  chess.load_pgn(pgn)
  const boardLayout = {}
  ;['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((col) => {
    new Array(8).fill(null).map((_, i) => {
      const piece = chess.get(col + (i + 1))
      if (piece) boardLayout[col + (i + 1)] = piece
    })
  })
  return boardLayout
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateRandomMembers = (count, highestMemberId) => {
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const randomUsername = rug.generate()
      const randomAddress = EthersWallet.createRandom().address
      let masterTitle
      const rand = Math.random()
      if (rand > 0.5) masterTitle = filters.titleList[randomInt(0, 9)]
      return {
        id: (highestMemberId + index).toString(),
        username: randomUsername.toLowerCase(),
        address: randomAddress.toLowerCase(),
        imageSrc: `data:image/jpeg;base64,${
          randomAvatarsBase64[randomInt(0, 199)]
        }`,
        country: countries[Math.floor(Math.random() * countries.length)],
        ...(masterTitle && { masterTitle }),
      }
    })
}

const generateRandomTreasures = (count, highestTokenId, members) => {
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const ran1 = Math.floor(Math.random() * members.length)
      const ran2 = ran1 === members.length - 1 ? ran1 - 1 : ran1 + 1
      const black = members[ran1]
      const white = members[ran2]
      const winner = randomInt(1, 2) > 1 ? black : white
      const minter = randomInt(1, 2) > 1 ? black : white

      const realGame = realGames[randomInt(0, realGames.length - 1)]

      let game = parseGameFromChessDotCom(realGame)
      game = {
        ...game,
        blackRatingDelta: deltaRating[game.id].black,
        whiteRatingDelta: deltaRating[game.id].white,
      }
      const treasure = generateTreasureDataOffline({
        game,
        title: randomTitles[randomInt(0, randomTitles.length - 1)],
        minter,
        white,
        black,
        owner: minter,
        index,
      })
      return {
        ...treasure,
        tokenId: highestTokenId + index + 1001,
        tokenUri: 'fakeUri',
        uriData: 'fakeUridata',
      }
    })
}

const generateTreasureDataOffline = ({
  game,
  title,
  minter,
  owner,
  white,
  black,
  index,
}) => {
  const getTreasureId = ({ moves, endTime, cardColor }) => {
    const endTimeUnix = Date.parse(endTime) / 1000
    // WARNING: Do not use this code elsewhere. Additional randomness
    // is added here to allow seeding thousands of games without id collision.
    // These ids are not correct!
    return sha3(
      `${moves} ${endTimeUnix} ${cardColor} ${randomInt(0, 10000000)} ${index}`
    )
  }

  const getRarity = (score) => {
    if (score < 6) return filters.rarityList[0]
    if (score < 11) return filters.rarityList[1]
    if (score < 14) return filters.rarityList[2]
    return filters.rarityList[3]
  }
  const cardColor = minter.username === white.username ? 'white' : 'black'
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
  const { openingValue, score, achievements } = achievementsCalculator(
    game.pgn,
    cardColor
  )
  const achievementsList = achievements.map((item) => item.value)
  return {
    id: treasureId,
    blackId: black.id,
    whiteId: white.id,
    minterId: minter.id,
    ownerId: owner.id,
    winner,
    title,
    cardColor,
    gifUrl: getGifUrl({ tcn: game.tcn, playerColor: cardColor }),
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
    boardLayout: JSON.stringify(getBoardLayout(game.moves)),
    moveCount: game.moveCount,
    ruleVariant: game.ruleVariant,
    externalUrl: game.externalUrl,
    opening: openingValue,
    rarity: getRarity(score),
    achievements: achievementsList,
    achievementScore: score,
  }
}

module.exports = { generateRandomTreasures, generateRandomMembers }
