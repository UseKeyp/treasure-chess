import { logger } from './logger'

//SVG to base 64 converter gives us:

const pawnIcon = ''
const knightIcon = ''
const bishopIcon = ''
const rookIcon = ''
const queenIcon = ''

//unused but could be useful to have
const _clockIcon = ''
const _boardIcon = ''

export const getIconFromPoints = async (points) => {
  switch (points) {
    case 1:
      return pawnIcon
      break
    case 2:
      return knightIcon
      break
    case 3:
      return bishopIcon
      break
    case 4:
      return rookIcon
      break
    case 5:
      return queenIcon
      break
  }
}
