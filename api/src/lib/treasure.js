const { id: sha3 } = require('@ethersproject/hash')

import { fetchMember } from 'src/lib/members'

export const getTreasureCardColor = ({ game, memberId }) =>
  game.whiteId === memberId ? 'white' : 'black'

export const getTreasureId = ({
  moves, // String of moves from the PGN (without timestamps)
  endTime, // Timecode from chess.com API
  cardColor, // String of version of treasure: "white" or "black"
}) => {
  const endTimeUnix = Date.parse(endTime) / 1000
  return sha3(`${moves} ${endTimeUnix} ${cardColor}`)
  // eg. sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6 1612749143 white")
}

const getRarity = (score) => {
  if (score < 6) return 'Common'
  if (score < 11) return 'Uncommon'
  if (score < 14) return 'Rare'
  return 'Mythic'
}

export const getTreasure = async ({
  game,
  title,
  minter,
  owner,
  mintPurchase,
}) => {
  const cardColor = getTreasureCardColor({ game, memberId: minter.id })
  const treasureId = getTreasureId({
    moves: game.moves,
    endTime: game.endTime,
    cardColor,
  })
  // Create members if they don't exist
  const white = await fetchMember(game.whiteUsername)
  const black = await fetchMember(game.blackUsername)

  return {
    id: treasureId,
    black: { connect: { id: black.id } },
    blackUsername: black.username,
    white: { connect: { id: white.id } },
    whiteUsername: white.username,
    ...(game.winnerId && { winner: { connect: { id: game.winnerId } } }), // Optional
    minter: { connect: { id: minter.id } },
    owner: { connect: { id: owner.id } },
    title,
    cardColor,
    blackRating: game.blackRating,
    whiteRating: game.whiteRating,
    blackMasterTitle: black.title,
    whiteMasterTitle: white.title,
    timeControl: game.timeControl,
    termination: game.termination,
    endTime: game.endTime,
    outcome: game.outcome,
    event: game.event,
    moves: game.moves,
    moveCount: game.moveCount,
    ruleVariant: game.ruleVariant,
    externalUrl: game.externalUrl,
    opening: game.opening,
    rarity: getRarity(game.achievementScore),
    achievements: game.achievements,
    achievementScore: game.achievementScore,
    // Purchase details
    mintPurchase: {
      connect: {
        id: mintPurchase.id,
      },
    },
  }
}
