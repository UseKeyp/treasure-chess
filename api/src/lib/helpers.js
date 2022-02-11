import ProfanityFilter from 'bad-words'
import { EnvelopError } from '@envelop/core'
const chess = require('chess.js')
const Chess = chess.Chess

const profanityFilter = new ProfanityFilter()

export const isHexAddress = (address) => {
  return /^0x[0-9a-fA-F]{40}$/i.test(address)
}

export const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null

export const isProduction = ['staging', 'prod'].includes(process.env.NODE_ENV)

export const isExpired = (expiration) => {
  return new Date(expiration) > new Date()
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
