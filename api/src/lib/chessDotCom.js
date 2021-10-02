import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/api'
import ChessWebAPI from 'chess-web-api'

const chessAPI = new ChessWebAPI()

const API_URL = process.env.CHESS_API_URL

///////////////////////
// cross-fetch
///////////////////////

export const getChessMember = async ({ accessToken, id }) => {
  // TODO: Finish fetching member from chess.com via accessToken
  const response = await fetch(`${API_URL}/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
  console.log(response)
  return response.user
}

///////////////////////
// chess-web-api
///////////////////////

export const fetchMemberDetails = (id) => {
  return chessAPI.player(id)
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
