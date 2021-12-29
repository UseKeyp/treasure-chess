import achievementsCalculator from '@treasure-chess/chess-achievements'
const { id: sha3 } = require('@ethersproject/hash')

import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { fetchChessGames, fetchChessGame } from 'src/lib/chessCom/chessCom'
import { parseGameFromChessDotCom } from 'src/lib/chessCom/gameParsing'
import { getGifUrl } from 'src/lib/chessCom/gifGetter'
const filters = require('@treasure-chess/treasure-filters')
const { getBoardLayout } = require('@treasure-chess/chess-image-generator')

const getRarity = (score) => {
  if (score < 6) return filters.rarityList[0]
  if (score < 11) return filters.rarityList[1]
  if (score < 14) return filters.rarityList[2]
  return filters.rarityList[3]
}

export const getTreasureCardColor = ({ game, username }) =>
  game.whiteUsername === username ? 'white' : 'black'

export const getTreasureId = ({
  moves, // String of moves from the PGN (without timestamps)
  endTime, // Timecode from chess.com API
  cardColor, // String of version of treasure: "white" or "black"
}) => {
  const endTimeUnix = Date.parse(endTime) / 1000
  return sha3(`${moves} ${endTimeUnix} ${cardColor}`)
  // eg. sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6 1612749143 white")
}

const getFullGameDetails = async ({
  game: rawGame,
  username,
  includeAchievements,
}) => {
  const game = parseGameFromChessDotCom(rawGame)
  const cardColor = getTreasureCardColor({ game, username })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  const treasure = await db.treasure.findUnique({
    where: { id: treasureId },
    include: {
      black: true,
      white: true,
    },
  })
  if (treasure) return treasure
  const { opening, score, achievements } = achievementsCalculator(
    game.pgn,
    cardColor
  )
  const achievementsString = achievements.map((item) => item.name).join(',')
  const white = await fetchMember(game.whiteUsername)
  const black = await fetchMember(game.blackUsername)
  let winnerId
  if (game.winnerUsername === game.whiteUsername) winnerId = white.id
  else if (game.winnerUsername === game.blackUsername) winnerId = black.id
  return {
    ...game,
    treasureId,
    white,
    black,
    blackId: black.id,
    whiteId: white.id,
    winnerId,
    cardColor,
    opening,
    boardLayout: JSON.stringify(getBoardLayout(game.moves)),
    gifUrl: getGifUrl({ tcn: game.tcn, playerColor: cardColor }),
    ...(includeAchievements && { achievements: achievementsString }),
    ...(includeAchievements && { rarity: getRarity(score) }),
    ...(includeAchievements && { achievementScore: score }),
  }
}

export const fetchGame = async ({
  id: gameId,
  username,
  endTime,
  includeTreasureData,
}) => {
  const game = await fetchChessGame({ username, gameId, endTime })
  if (!game) return null
  if (includeTreasureData)
    return getFullGameDetails({ game, username, includeAchievements: true })
  return parseGameFromChessDotCom(game)
}

export const getGamesWithArguments = async ({ username, filter }) => {
  const filterParams = new URLSearchParams(filter)
  let filterObj = {}
  // Convert text names to values
  for (var pair of filterParams.entries()) {
    filterObj[pair[0]] = pair[1]
  }
  const year = filterObj.year || new Date().getFullYear()
  const month = filterObj.month || 0
  // const month = filterObj.month === 'Any' ? null : filterObj.month || 0
  // const day = filterObj.day === 'Any' ? null : filterObj.day

  const games = await fetchChessGames({ username, year, month })
  if (!games?.length) return []
  // TODO: Limit to 200 most recent games?
  const sortedGames = games.sort((a, b) => b.endTime - a.endTime) //.slice(0, 200)
  const filteredGames = sortedGames.filter((game) => {
    if (
      filterObj.username &&
      ![game.black.username, game.white.username].includes(filterObj.username)
    )
      return false
    if (filterObj?.outcome !== 'any') {
      let member = game.white
      if (game.black.username === username) member = game.black
      if (filterObj.outcome === 'won' && member.result !== 'win') return false
      if (filterObj.outcome === 'draw' && member.result !== 'draw') return false
      if (
        filterObj.outcome === 'lost' &&
        (member.result === 'win' || member.result === 'draw')
      )
        return false
    }
    return true
  })

  return Promise.all(
    filteredGames.map((game) => getFullGameDetails({ game, username }))
  )
}
