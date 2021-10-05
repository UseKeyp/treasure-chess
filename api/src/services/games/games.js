import { fetchGame, fetchGamesForMember } from 'src/lib/games'

export const gamesForMember = ({ id }) => fetchGamesForMember(id)

export const game = ({
  id, // game ID
  username,
  endTime,
}) => {
  return fetchGame({ id, username, endTime })
}

export const Treasure = {}
