const { id: sha3 } = require('@ethersproject/hash')

import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'

export const getTreasureCardColor = ({ memberId, game }) =>
  game.whiteId ? 'white' : 'black'

export const getTreasureId = ({
  moves, // String of moves from the PGN (without timestamps)
  endTime, // String of UNIX timecode from chess.com API
  cardColor, // String of version of treasure: "white" or "black"
}) => {
  let endTimeString = endTime
  if (typeof endTime === Date)
    endTimeString = (Date.parse(endTime) / 1000).toString()
  return sha3(moves + endTime + cardColor)
  // sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6"+"1612749143"+"white")
}

export const createTreasure = async ({ game, memberId, name }) => {
  const cardColor = getTreasureCardColor({ game, memberId })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  // Create members if they don't exist
  const white = await fetchMember(game.whiteId, true)
  const black = await fetchMember(game.blackId, true)
  const treasure = db.treasure.create({
    id: treasureId,
    black: { connect: { id: black.id } },
    white: { connect: { id: white.id } },
    ...(game.winnerId && { winner: { connect: { id: game.winnerId } } }), // Optional
    // TODO: Can we make a connection using id, though relation uses address?
    minter: { connect: { id: memberId } },
    name: 'Placeholder name',
    cardColor,
    blackRating: game.blackRating,
    whiteRating: game.whiteRating,
    // blackMasterTitle:
    // whiteMasterTitle:
    timeControl: game.timeControl,
  })
}
