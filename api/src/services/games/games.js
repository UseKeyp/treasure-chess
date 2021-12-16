import {
  fetchGame,
  getGamesWithArguments,
  getFullGameDetails,
} from 'src/lib/games'

export const games = async ({ filter }) =>
  getGamesWithArguments({
    username: context.currentUser.username,
    filter,
  })

export const game = async ({
  id, // game ID
  username,
  endTime,
}) => {
  const game = await fetchGame({ id, username, endTime })
  return getFullGameDetails({ username: context.currentUser.username, game })
}

export const Treasure = {}
