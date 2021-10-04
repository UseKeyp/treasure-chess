import { fetchGame, fetchGamesForMember } from 'src/lib/games'

export const gamesForMember = ({ id }) => fetchGamesForMember(id)

// Game by game id and date
export const game = ({
  id, // game ID
  memberId,
  endTime,
}) => {
  return fetchGame({ id, memberId, endTime })
}

export const Treasure = {}
