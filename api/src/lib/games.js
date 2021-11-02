import achievementsCalculator from '@treasure-chess/chess-achievements'

import { db } from 'src/lib/db'
import { getTreasureId, getTreasureCardColor } from 'src/lib/treasure'
import { fetchMember } from 'src/lib/members'
import { fetchChessGames, fetchChessGame } from 'src/lib/chessCom/chessCom'
import { parseGameFromChessDotCom } from 'src/lib/chessCom/gameParsing'

const getFullGameDetails = async ({ game: rawGame, username }) => {
  const game = parseGameFromChessDotCom(rawGame)
  const cardColor = getTreasureCardColor({ game, username })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  const treasure = await db.treasure.findUnique({
    where: { id: treasureId },
  })
  if (treasure) return treasure
  const { opening, score, achievements } = achievementsCalculator(
    game.pgn,
    cardColor
  )

  const achievementsString = achievements
    .slice(0, 3)
    // TODO: Remove the placeholder number here once the achievments library has been updated
    // .map((item) => item.name)
    .map((item) => `#23. ${item.name}`)
    .join(',')
  const white = await fetchMember(game.whiteUsername)
  const black = await fetchMember(game.blackUsername)
  let winnerId
  if (game.winnerUsername === game.whiteUsername) winnerId = white.id
  else if (game.winnerUsername === game.blackUsername) winnerId = black.id
  return {
    ...game,
    blackId: black.id,
    whiteId: white.id,
    winnerId,
    cardColor,
    opening,
    achievements: achievementsString,
    achievementScore: score,
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
  if (includeTreasureData) return getFullGameDetails({ game, username })
  return parseGameFromChessDotCom(game)
}

export const fetchGamesForMember = async (id) => {
  const { username } = await db.member.findUnique({ where: { id } })
  // TODO: Remove hard-coded values and add year, month arguments
  const year = 2021
  const month = 10
  const games = await fetchChessGames({ username, year, month })
  if (!games?.length) return []
  return Promise.all(
    games.map((game) => getFullGameDetails({ game, username }))
  )
}
