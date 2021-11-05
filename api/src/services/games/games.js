import { fetchGame, fetchGamesForMember } from 'src/lib/games'

export const games = async ({ _filter }) => {
  // TODO: parse filters
  const games = await fetchGamesForMember(context.currentUser.id)
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
