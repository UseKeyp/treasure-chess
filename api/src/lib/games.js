import { db } from 'src/lib/db'
import { getTreasureId, getTreasureCardColor } from 'src/lib/treasure'
import { fetchChessGames, fetchChessGame } from 'src/lib/chessCom/chessCom'
import { parseGameFromChessDotCom } from 'src/lib/chessCom/gameParsing'

const addTreasureIdToGame = async ({ game, username }) => {
  const cardColor = getTreasureCardColor({ game, username })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  const treasure = await db.treasure.findUnique({ where: { id: treasureId } })
  if (treasure) return { ...game, treasureId }
  return game
}

export const fetchGamesForMember = async (id) => {
  const { username } = await db.member.findUnique({ where: { id } })
  // TODO: Remove hard-coded values and add year, month arguments
  const year = 2021
  const month = 10
  const games = await fetchChessGames({ username, year, month })
  if (!games?.length) return []
  const gamesWithTreasureIds = await Promise.all(
    games.map(
      async (game) =>
        await addTreasureIdToGame({
          game: parseGameFromChessDotCom(game),
          username,
        })
    )
  )
  return gamesWithTreasureIds
}

export const fetchGame = async ({ id: gameId, username, endTime }) => {
  const game = await fetchChessGame({ username, gameId, endTime })
  if (!game) return null
  return parseGameFromChessDotCom(game)
}
