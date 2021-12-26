const rug = require('random-username-generator')
const { Wallet: EthersWallet } = require('@ethersproject/wallet')
const { id: sha3 } = require('@ethersproject/hash')
const filters = require('@treasure-chess/treasure-filters')
const achievementsCalculator = require('@treasure-chess/chess-achievements')
const {
  parseGameFromChessDotCom,
} = require('../../api/src/lib/chessCom/gameParsing')
const { getGifUrl } = require('../../api/src/lib/chessCom/gifGetter')

const realGames = require('./data/realGames.json')
const randomTitles = require('./data/randomTitles.json')
const randomAvatarsBase64 = require('./data/randomAvatarsBase64.js')
const countries = require('./data/countries')
import testBoard from './data/testBoard'

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
      if (Math.random() > 0.9) {
        masterTitle =
          filters.titleList[
            Math.floor(Math.random() * filters.titleList.length)
          ].toUpperCase()
      }
      return {
        id: (highestMemberId + index).toString(),
        username: randomUsername,
        address: randomAddress,
        imageSrc: `data:image/jpeg;base64,${
          randomAvatarsBase64[randomInt(0, 199)]
        }`,
        country: countries[Math.floor(Math.random() * countries.length)],
        masterTitle,
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

      const game = parseGameFromChessDotCom(realGame)
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
        tokenId: highestTokenId + index + 1,
        tokenUri: 'fakeUri',
        uriData: 'fakeUridata',
      }
    })
}

export const generateTreasureDataOffline = ({
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
    boardLayout: JSON.stringify(testBoard),
    moveCount: game.moveCount,
    ruleVariant: game.ruleVariant,
    externalUrl: game.externalUrl,
    opening: opening,
    rarity: getRarity(score),
    achievements: achievementsString,
    achievementScore: score,
  }
}

module.exports = { generateRandomTreasures, generateRandomMembers }
