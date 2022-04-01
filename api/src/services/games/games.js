import {
  fetchGame,
  getGamesWithFilter,
  getFullGameDetails,
} from 'src/lib/games'

export const gamesWithFilter = async ({ filter, page }) =>
  getGamesWithFilter({
    username: context.currentUser.username,
    filter,
    page,
  })

export const game = async ({
  id, // game ID
  username,
  endTime,
}) => {
  const game = await fetchGame({ id, username, endTime })
  return getFullGameDetails({ username: context.currentUser.username, game })
}

export const Game = {}
