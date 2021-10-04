import fetch from 'cross-fetch'
import { AuthenticationError } from '@redwoodjs/graphql-server'
import ChessWebAPI from 'chess-web-api'

import { getAppAccessToken } from 'src/lib/oAuth/chessDotCom'
const chessAPI = new ChessWebAPI()

const API_URL = process.env.CHESS_API_URL

const defaultFetchOptions = {
  // Required to prevent rate-limiting
  headers: {
    Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
  },
}

export const fetchChessMember = (username) => {
  return fetch(`${API_URL}/pub/player/${username}`, defaultFetchOptions).then(
    (res) => res.json()
  )
}
