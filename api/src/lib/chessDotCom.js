import ChessWebAPI from 'chess-web-api'

const chessAPI = new ChessWebAPI()

export const fetchChessDotComUserDetails = async (id) => {
  return await chessAPI.player(id)
}

export const fetchChessDotComGames = async ({ memberId, year, month }) => {
  try {
    const data = await chessAPI.getPlayerCompleteMonthlyArchives(
      id,
      year,
      month
      // options
    )
    return data.body.games
  } catch (e) {
    throw `Error fetching data from chess.com ${JSON.stringify(e)}`
  }
}
