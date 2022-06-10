import fetch from 'cross-fetch'
import { logger } from 'src/lib/logger'
import { getAccessToken } from 'src/lib/members'

export const fetchChessMember = (username) => {
  try {
    return fetch(`${process.env.CHESS_API_URL}/pub/player/${username}`, {
      headers: {
        // Required to prevent rate-limiting
        Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
      },
    }).then((res) => res.json())
  } catch (e) {
    throw `fetchChessMember() ${username} ${e}`
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
    // logger.debug({ custom: res }, 'fetchChessGames')
    return res.json()
  })
  // logger.debug({ custom: response })
  return response.games || []
}

export const fetchChessGame = async ({ username, gameId, endTime }) => {
  try {
    logger.debug(
      { custom: { username, gameId, endTime } },
      'fetchChessGame  args'
    )
    const year = new Date(endTime).getFullYear()
    let month = new Date(endTime).getMonth() + 1
    if (month.toString().length < 2) month = '0' + month
    const games = await fetchChessGames({ username, year, month })
    // logger.debug({ custom: games }, 'fetchChessGame games')
    const game = games.find((g) => g.url.includes(gameId))
    return game
  } catch (e) {
    throw new Error(`fetchChessGame() ${e}`)
  }
}

export const fetchGameByIdOrUrl = async (gameIdOrUrl) => {
  try {
    const accessToken = await getAccessToken()
    let id = gameIdOrUrl
    if (gameIdOrUrl.includes('chess.com')) id = gameIdOrUrl.split('live/')[1]
    let url = `${process.env.CHESS_API_URL}/v1/games/${id}/live`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      logger.warn({ custom: res }, 'fetchGameByIdOrUrl res')
      return res.json()
    })
    logger.warn({ custom: response }, 'fetchGameByIdOrUrl response')
    return { ...response.data, id }
  } catch (e) {
    throw new Error(`fetchGameByIdOrUrl() ${e}`)
  }
}

export const fetchRatingDelta = async (id) => {
  try {
    const response = await fetch(
      `https://www.chess.com/callback/live/game/${id}`,
      {
        headers: {
          // Required to prevent rate-limiting
          Authorization: `Bearer ${process.env.CHESS_API_ACCESS_TOKEN}`,
        },
      }
    ).then((res) => {
      return res.json()
    })
    return {
      white: response.game.ratingChangeWhite || 0,
      black: response.game.ratingChangeBlack || 0,
    }
  } catch (e) {
    throw `fetchRatingDelta ${e}`
  }
}

export const isStaff = async (username) => {
  const response = await fetch(
    `https://api.chess.com/pub/player/${username}`
  ).then((res) => {
    return res.json()
  })

  if (response.status === 'staff') {
    return true
  } else {
    return false
  }
}
