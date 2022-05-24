import achievementsCalculator from '@treasure-chess/chess-achievements'
const { id: sha3 } = require('@ethersproject/hash')

import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import {
  fetchChessGames,
  fetchChessGame,
  fetchRatingDelta,
  fetchGameByIdOrUrl,
} from 'src/lib/chessCom/chessCom'
import { parseGameFromChessDotCom } from 'src/lib/chessCom/gameParsing'
import { getGifUrl } from 'src/lib/chessCom/gifGetter'
import { getBoardLayout } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import filters, { GAMES_PER_PAGE } from '@treasure-chess/treasure-filters'

const getRarity = (score) => {
  if (score < 6) return filters.rarityList[0]
  if (score < 11) return filters.rarityList[1]
  if (score < 14) return filters.rarityList[2]
  return filters.rarityList[3]
}

export const getTreasureCardColor = ({ game, username }) =>
  game.whiteUsername.toLowerCase() === username.toLowerCase()
    ? 'white'
    : 'black'

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
  try {
    let game = parseGameFromChessDotCom(rawGame)
    const ratingChange = await fetchRatingDelta(game.id)
    game = {
      ...game,
      blackRatingDelta: ratingChange.black,
      whiteRatingDelta: ratingChange.white,
    }
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
    const { openingValue, score, achievements } = achievementsCalculator(
      game.pgn,
      cardColor
    )
    const achievementsList = achievements.map((item) => item.value)
    const white = await fetchMember(game.whiteUsername, true) // Get latest data
    const black = await fetchMember(game.blackUsername, true)
    let winnerId
    if (game.winnerUsername === game.whiteUsername) winnerId = white.id
    else if (game.winnerUsername === game.blackUsername) winnerId = black.id
    if (includeAchievements && !game.tcn) throw new Error('No tcn for game!')
    return {
      ...game,
      treasureId,
      white,
      black,
      blackId: black.id,
      whiteId: white.id,
      winnerId,
      cardColor,
      opening: openingValue,
      boardLayout: JSON.stringify(getBoardLayout(game.moves)),
      gifUrl: getGifUrl({ tcn: game.tcn, playerColor: cardColor }),
      ...(includeAchievements && { achievements: achievementsList }),
      ...(includeAchievements && { rarity: getRarity(score) }),
      ...(includeAchievements && { achievementScore: score }),
    }
  } catch (e) {
    throw new Error(`getFullGameDetails() ${e.message}`)
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

export const getGamesWithFilter = async ({ username, filter, page = 0 }) => {
  const filterParams = new URLSearchParams(filter)
  let filterObj = {}
  // Convert text names to values
  for (var pair of filterParams.entries()) {
    filterObj[pair[0]] = pair[1]
  }
  const now = new Date()
  const year = filterObj.year || now.getFullYear()
  const month = filterObj.month || now.getMonth()

  let games = []
  logger.debug({ custom: filterObj }, 'filterObj')
  if (filterObj.url) {
    let gameById = await fetchGameByIdOrUrl(filterObj.url)
    // We don't trust the new v1/games endpoint, so we just grab the endtime
    if (!gameById || !gameById) return { count: 0, games: [] }
    logger.debug({ custom: { gameById } }, 'gameById 1')
    gameById = await fetchChessGame({
      username,
      gameId: gameById.id,
      endTime: new Date(gameById.game_end_time * 1000),
    })
    if (!gameById) return { count: 0, games: [] }
    logger.debug({ custom: { gameById } }, 'gameById 2')
    const fullGameById = await getFullGameDetails({ game: gameById, username })
    return { count: 1, games: [fullGameById] }
  } else {
    games = await fetchChessGames({ username, year, month })
  }

  logger.debug(`totalGames: ${games?.length}`)
  if (!games?.length) return { count: 0, games: [] }

  const filteredGames = games.filter((game) => {
    if (
      filterObj.username &&
      ![
        game.black.username.toLowerCase(),
        game.white.username.toLowerCase(),
      ].includes(filterObj.username)
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
  logger.debug(`filteredGames: ${filteredGames.length}`)
  const count = filteredGames.length
  const sortedGames = filteredGames
    .sort((a, b) => b.end_time - a.end_time)
    .slice(page * GAMES_PER_PAGE, (page + 1) * GAMES_PER_PAGE)
  logger.debug(
    `slice params ${page * GAMES_PER_PAGE}, ${(page + 1) * GAMES_PER_PAGE}`
  )
  let fullGames = []
  await Promise.all(
    sortedGames.map(async (game) => {
      let gameState = game
      if (!game.termination) {
        gameState['termination'] = 'Unknown'
        logger.error(`Termination error: ${game.externalUrl}`)
      }
      try {
        const fullGame = await getFullGameDetails({ game: gameState, username })
        fullGames.push(fullGame)
      } catch {
        // Do nothing
      }
    })
  )
  logger.debug(`fullGames: ${fullGames.length}`)
  return {
    games: fullGames,
    count,
  }
}
