const countMoves = (moves) => {
  return Math.round(moves.trim().split(' ').length / 2)
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

export const getOpening = (_moves) => {
  // Currently only used in Treasures
  // TODO: Complete this function
  return "Queen's Gambit"
}

export const getAchievements = (_moves) => {
  // Currently only used in Treasures
  // TODO: Complete this function
  return 'win/play above 2200,queen side castle,mate with a bishop'
}

export const parseGameFromChessDotCom = (game) => {
  const {
    termination,
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
