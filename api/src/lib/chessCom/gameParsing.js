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

const getGameRuleVariant = (game) => {
  if (game.rules === 'chess') return 'Standard'
  return game.rules.replace(/^\w/, (c) => c.toUpperCase())
}

export const parseGameFromChessDotCom = (game) => {
  const {
    termination,
    blackRating,
    whiteRating,
    timeControl,
    moveCount,
    moves,
    winner,
  } = parsePgn(game.pgn)
  const splitUrl = game.url.split('/')
  const id = splitUrl[splitUrl.length - 1]
  let winnerUsername
  if (winner === 'white') winnerUsername = game.white.username
  if (winner === 'black') winnerUsername = game.black.username
  return {
    id,
    pgn: game.pgn,
    blackRating,
    whiteRating,
    timeControl,
    termination,
    endTime: new Date(game.end_time * 1000),
    outcome: winner,
    moves,
    moveCount,
    ruleVariant: getGameRuleVariant(game),
    blackUsername: game.black.username,
    whiteUsername: game.white.username,
    winnerUsername,
    externalUrl: game.url,
  }
}
