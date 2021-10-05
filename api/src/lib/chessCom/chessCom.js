import fetch from 'cross-fetch'

const API_URL = process.env.CHESS_API_URL

const defaultFetchOptions = {
  headers: {
    // Required to prevent rate-limiting
    Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
  },
}

export const fetchChessMember = (username) => {
  return fetch(`${API_URL}/pub/player/${username}`, defaultFetchOptions).then(
    (res) => res.json()
  )
}

export const fetchChessGames = async ({ username, year, month }) => {
  const response = await fetch(
    `${API_URL}/pub/player/${username}/games/${year}/${month}`,
    defaultFetchOptions
  ).then((res) => res.json())
  return response.games || []
}

export const fetchChessGame = async ({ username, gameId, endTime }) => {
  const year = new Date(endTime).getFullYear()
  let month = new Date(endTime).getMonth() + 1
  if (month.toString().length < 2) month = '0' + month
  const games = await fetchChessGames({ username, year, month })
  const game = games.find((g) => g.url.includes(gameId))
  return game
}
