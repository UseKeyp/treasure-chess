import { requireAuth } from 'src/lib/auth'
import { fetchGame, fetchGames } from 'src/lib/games'

export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

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
