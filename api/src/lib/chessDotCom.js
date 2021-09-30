import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import ChessWebAPI from 'chess-web-api'

import { getAppAccessToken } from 'src/lib/oAuth/chessDotCom'
const chessAPI = new ChessWebAPI()

const API_URL = process.env.CHESS_API_URL

const defaultFetchOptions = {
  headers: {
    Authorization: `Bearer ${process.env.CHESS_ACCESS_TOKEN}`,
  },
}
///////////////////////
// cross-fetch
///////////////////////

export const fetchChessMember = (username) => {
  return fetch(`${API_URL}/pub/player/${username}`, defaultFetchOptions).then(
    (res) => res.json()
  )
}

///////////////////////
// chess-web-api
///////////////////////

// TODO: REMOVE since rate-limited without access token header

// export const fetchMemberDetails = (id) => {
//   return chessAPI.player(id)
// }
//
// export const fetchChessDotComGames = async ({ memberId, year, month }) => {
//   try {
//     const data = await chessAPI.getPlayerCompleteMonthlyArchives(
//       id,
//       year,
//       month
//       // options
//     )
//     return data.body.games
//   } catch (e) {
//     throw `Error fetching data from chess.com ${JSON.stringify(e)}`
//   }
// }
