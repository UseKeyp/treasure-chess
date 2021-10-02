import { fetchGame, fetchGames } from 'src/lib/games'

// Games by member id
export const games = async ({
  id, // user ID
}) => {
  return fetchGames(id)
}

// Game by game id and date
export const game = ({
  id, // game ID
  memberId,
  endTime,
}) => {
  return fetchGame({ id, memberId, endTime })
}

export const Treasure = {}
