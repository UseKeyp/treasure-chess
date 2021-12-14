import achievementsCalculator from '@treasure-chess/chess-achievements'

import { db } from 'src/lib/db'
import { getTreasureId, getTreasureCardColor } from 'src/lib/treasures'
import { fetchMember } from 'src/lib/members'
import { fetchChessGames, fetchChessGame } from 'src/lib/chessCom/chessCom'
import { parseGameFromChessDotCom } from 'src/lib/chessCom/gameParsing'

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
    white,
    black,
    blackId: black.id,
    whiteId: white.id,
    winnerId,
    cardColor,
    opening,
    ...(includeAchievements && { achievements: achievementsString }),
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
