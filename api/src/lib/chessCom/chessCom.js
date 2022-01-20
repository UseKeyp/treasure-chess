import fetch from 'cross-fetch'

export const fetchChessMember = (username) => {
  try {
    return fetch(`${process.env.CHESS_API_URL}/pub/player/${username}`, {
      headers: {
        // Required to prevent rate-limiting
        Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
      },
    }).then((res) => res.json())
  } catch (e) {
    throw `fetchChessMember ${e}`
  }
}

export const fetchChessGames = async ({ username, year, month }) => {
  let monthString = month.toString()
  if (month.toString().length < 2) monthString = '0' + month
  const response = await fetch(
    `${process.env.CHESS_API_URL}/pub/player/${username}/games/${year}/${monthString}`,
    {
      headers: {
        // Required to prevent rate-limiting
        Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
      },
    }
  ).then((res) => {
    // console.log(res)
    return res.json()
  })
  // console.log(response)
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
