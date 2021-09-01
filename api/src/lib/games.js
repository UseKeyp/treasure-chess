import { db } from 'src/lib/db'
import { getTreasureId, getTreasureCardColor } from 'src/lib/treasure'
import { fetchChessDotComGames } from 'src/lib/chessDotCom'

const countMoves = (moves) => {
  return Math.round(moves.trim().split(' ').length / 2)
}

const parseDate = (rawDate) => {
  try {
    if (!rawDate) return ''
    if (typeof rawDate === 'object')
      rawDate = new Date(rawDate).toISOString().split('T')[0].replace('-', '.')
    let [year, month, day] = rawDate.split(/[\.-]/)
    if (year.includes('?')) year = 0
    month = month.includes('?') ? 0 : month - 1
    if (day.includes('?')) day = 1
    return new Date(year, month, day)
  } catch (e) {
    console.log('Error in parseDate() with argument: ')
    console.log({ rawDate })
  }
}

const parsePgn = (pgn) => {
  let black
  let white
  let winner = 'white'
  let eventName
  let moves
  let termination
  let blackRating
  let whiteRating
  let timeControl
  pgn.split(/\n/).map((line) => {
    if (line.includes('[Black ')) black = line.split(`"`)[1]
    if (line.includes('[White ')) white = line.split(`"`)[1]
    if (line.includes('[Event ')) eventName = line.split(`"`)[1]
    let winnerRaw
    if (line.includes('[Result ')) winnerRaw = line.split(`"`)[1]
    if (winnerRaw === '0-1') winner = 'black'
    else if (winnerRaw === '1/2-1/2') winner = 'draw'
    if (line.match(/1./))
      moves = line
        .split(/[0-21/2]+-/)[0]
        .replace(/\{.+?\} /g, '') // remove clock time
        .trim()
    if (line.includes('[Termination ')) termination = line.split(`"`)[1]
    if (line.includes('[BlackElo ')) blackRating = Number(line.split(`"`)[1])
    if (line.includes('[WhiteElo ')) whiteRating = Number(line.split(`"`)[1])
    if (line.includes('[TimeControl ')) timeControl = Number(line.split(`"`)[1])
  })

  return {
    black,
    white,
    winner,
    event: eventName,
    moves,
    moveCount: countMoves(moves),
    termination,
    blackRating,
    whiteRating,
    timeControl,
  }
}

const getGameOutcome = ({ white, black }) => {
  if (white.result === 'win') return 'white'
  if (black.result === 'win') return 'black'
  return 'draw'
}

const getGameWinnerId = ({ white, black }) => {
  const outcome = getGameOutcome({ white, black })
  if (outcome === 'white') return white.id
  if (outcome === 'black') return black.id
  return null
}

const getGameRuleVariant = (game) => {
  if (game.rules === 'chess') return 'Standard'
  return game.rules.replace(/^\w/, (c) => c.toUpperCase())
}

export const getOpening = (moves) => {
  // Currently only used in Treasures
  // TODO: Complete this function
  return "Queen's Gambit"
}

export const getAchievements = (moves) => {
  // Currently only used in Treasures
  // TODO: Complete this function
  return 'win/play above 2200,queen side castle,mate with a bishop'
}

const parseGameFromChessDotCom = (game) => {
  const {
    termination,
    date,
    blackRating,
    whiteRating,
    timeControl,
    moveCount,
    moves,
  } = parsePgn(game.pgn)
  const splitUrl = game.url.split('/')
  const id = splitUrl[splitUrl.length - 1]
  return {
    id,
    blackRating,
    whiteRating,
    // blackMasterTitle, // TODO:
    // whiteMasterTitle, // TODO:
    timeControl,
    termination,
    endTime: new Date(game.end_time * 1000),
    outcome: getGameOutcome({ white: game.white, black: game.black }),
    moves,
    moveCount,
    ruleVariant: getGameRuleVariant(game),
    blackId: game.black.username,
    whiteId: game.white.username,
    winnerId: getGameWinnerId({ white: game.white, black: game.black }),
    externalUrl: game.url,
  }
}

const addTreasureIdToGame = async ({ game, memberId }) => {
  const cardColor = getTreasureCardColor({ game, memberId })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  const treasure = await db.treasure.findUnique({ where: { id: treasureId } })
  if (treasure) return { ...game, treasureId }
  return game
}

export const fetchGames = async (id) => {
  const year = 2021
  const month = 8
  const games = await fetchChessDotComGames({ memberId: id, year, month })
  if (!games) return []
  const gamesWithTreasureIds = await Promise.all(
    games.map(
      async (game, i) =>
        await addTreasureIdToGame({
          game: parseGameFromChessDotCom(game),
          memberId: id,
        })
    )
  )
  return gamesWithTreasureIds
}

export const fetchGame = async ({ id, memberId, endTime }) => {
  const year = new Date(endTime).getFullYear()
  let month = new Date(endTime).getMonth() + 1
  if (month.toString().length < 2) month = '0' + month
  // TODO: use chess-web-api instead
  const res = await fetch(
    `https://api.chess.com/pub/player/${memberId}/games/${year}/${month}`
  )
  const json = await res.json()
  if (!json.games) return null
  const game = json.games.find((g) => g.url.includes(id))
  if (!game) return null
  return parseGameFromChessDotCom(game)
}
