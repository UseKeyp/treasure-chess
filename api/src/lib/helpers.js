import { EnvelopError } from '@envelop/core'
import ProfanityFilter from 'bad-words'

import { logger } from 'src/lib/logger'

const chess = require('chess.js')
const Chess = chess.Chess

const profanityFilter = new ProfanityFilter()

profanityFilter.removeWords('Pawn', 'pawn')

export const isHexAddress = (address) => {
  return /^0x[0-9a-fA-F]{40}$/i.test(address)
}

export const isDevelopment =
  ['local', 'dev', 'sandbox'].includes(process.env.ENVIRONMENT) ||
  process.env.NODE_ENV == null

export const isProduction = !isDevelopment

export const isExpired = (expiration) => {
  return new Date(expiration) > new Date()
}

export const isOlderThanResubmitTimeout = (date) => {
  // var TEN_MIN = 10 * 60 * 1000
  // var TEN_MIN = 0.2 * 60 * 1000
  var TWO_HOURS = 60 * 60 * 1000 * 2
  const now = new Date()
  logger.debug({ custom: date }, 'date')
  logger.debug({ custom: now }, 'now')
  logger.debug(`TWO_HOURS ${TWO_HOURS}`)
  return now - new Date(date) > TWO_HOURS
}

export const checkProfanity = (string) => {
  if (profanityFilter.isProfane(string))
    throw new EnvelopError('String contains profanity')
}

export const validateTreasureTitle = (string) => {
  if (!string) throw new EnvelopError('Title must not be empty')
  checkProfanity(string)
  if (
    !string.match(
      /[\uD800-\uDBFF \uDC00-\uDFFF a-z A-Z 0-9 !@#$*%^&()+=-[\]';,.\\\/{}|":<>\?]/
    )
  )
    throw new Error(
      `Only alphanumeric characters, emojis, and the symbols !@#$%^&*()+=-[]\\/|';,.{}":<>? are allowed.`
    )
}

/**
 * Loads PGN into chess.js object,  and calculates the location pieces
 * @param {string} pgn Chess game PGN
 */
export const getBoardLayout = (pgn) => {
  const chess = new Chess()
  chess.load_pgn(pgn)
  const boardLayout = {}
  ;['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((col) => {
    new Array(8).fill(null).map((_, i) => {
      const piece = chess.get(col + (i + 1))
      if (piece) boardLayout[col + (i + 1)] = piece
    })
  })
  return boardLayout
}

export const cors = {
  origin: isProduction
    ? process.env.APP_DOMAIN
    : [
        'http://0.0.0.0:8910',
        'http://localhost:8910',
        'http://localhost',
        'http://10.0.2.2:8910',
      ],
  credentials: true,
}
