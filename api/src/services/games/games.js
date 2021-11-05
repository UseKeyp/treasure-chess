import { fetchGame, getGamesWithArguments } from 'src/lib/games'

export const games = async ({ filter }) => {
  const games = await getGamesWithArguments({
    username: context.currentUser.username,
    filter,
  })
  return games
}

export const game = ({
  id, // game ID
  username,
  endTime,
}) => {
  return fetchGame({ id, username, endTime })
}

export const Treasure = {}
