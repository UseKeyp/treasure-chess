const { id: sha3 } = require('@ethersproject/hash')

import { db } from 'src/lib/db'
import { fetchMember } from 'src/lib/members'
import { fetchChessDotComUserDetails } from 'src/lib/chessDotCom'
import { getAchievements, getOpening } from 'src/lib/games'

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
  // Get master title
  const whiteChessDotComMember = await fetchChessDotComUserDetails(game.whiteId)
  const blackChessDotComMember = await fetchChessDotComUserDetails(game.blackId)

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
    blackMasterTitle: blackChessDotComMember.title, // Note: Only current master title is used
    whiteMasterTitle: whiteChessDotComMember.title,
    timeControl: game.timeControl,
    termination: game.termination,
    endTime: game.endTime,
    outcome: game.outcome,
    event: game.event,
    moves: game.moves,
    moveCount: game.moveCount,
    ruleVariant: game.ruleVariant,
    externalUrl: game.externalUrl,
    opening: getOpening(game.moves),
    achievements: getAchievements(game.moves),
  })
}
