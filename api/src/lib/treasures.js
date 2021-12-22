const { id: sha3 } = require('@ethersproject/hash')
import { db } from 'src/lib/db'

import { getGifUrl } from 'src/lib/chessCom/gifGetter'
const filters = require('@treasure-chess/treasure-filters')
const { TREASURES_PER_PAGE } = require('@treasure-chess/treasure-filters')

import { fetchMember } from 'src/lib/members'

export const getTreasureCardColor = ({ game, username }) =>
  game.whiteUsername === username ? 'white' : 'black'

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
  if (score < 6) return filters.rarityList[0]
  if (score < 11) return filters.rarityList[1]
  if (score < 14) return filters.rarityList[2]
  return filters.rarityList[3]
}

// NOTE: any updates to this function should also be made in /scripts/seed
export const generateTreasureData = async ({
  game,
  title,
  minter,
  owner,
  mintPurchase,
}) => {
  const cardColor = getTreasureCardColor({ game, username: minter.username })
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
    white: { connect: { id: white.id } },
    ...(game.winnerId && { winner: { connect: { id: game.winnerId } } }), // Optional
    minter: { connect: { id: minter.id } },
    owner: { connect: { id: owner.id } },
    title,
    cardColor,
    gifUrl: getGifUrl({ tn: game.tcn, playerColor: cardColor }),
    blackRating: game.blackRating,
    whiteRating: game.whiteRating,
    blackRatingDelta: game.blackRatingDelta,
    whiteRatingDelta: game.whiteRatingDelta,
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

const getValueByName = (list, name) =>
  list.find((item) => item.name === name).value

const getWhereQueryFromArgs = ({ username, filter }) => {
  const searchParams = new URLSearchParams(filter)
  let filterObj = {}
  // Convert text names to values
  for (var pair of searchParams.entries()) {
    let value = pair[1]
    if (pair[0] === 'timeControl')
      value = getValueByName(filters.timeControlList, pair[1])
    else if (pair[0] === 'moveCount')
      value = getValueByName(filters.moveCountList, pair[1])
    filterObj[pair[0]] = value
  }

  // Create each TreasureWhereInput
  const usernameQuery = username
    ? {
        OR: [{ black: { username } }, { white: { username } }],
      }
    : null

  const achievementQuery = filterObj.achievements
    ? {
        OR: filterObj.achievements.split(',').map((chiev) => ({
          achievements: {
            contains: chiev,
          },
        })),
      }
    : null

  const moveCountQuery = filterObj.moveCount
    ? {
        AND: [
          { moveCount: { gte: filterObj.moveCount[0] } },
          { moveCount: { lte: filterObj.moveCount[1] } },
        ],
      }
    : null

  return {
    ...(usernameQuery && usernameQuery),

    ...(achievementQuery && achievementQuery),
    ...(filterObj.opening && { opening: filterObj.opening }),
    ...(filterObj.color && { cardColor: filterObj.color }),
    ...(filterObj.title && { title: { contains: filterObj.title } }),
    ...(filterObj.termination && { termination: filterObj.termination }),
    ...(filterObj.timeControl && { timeControl: filterObj.timeControl }),
    ...(filterObj.outcome && { outcome: filterObj.outcome }),
    ...(moveCountQuery && moveCountQuery),
    ...(filterObj.rarity && { rarity: filterObj.rarity }),
    // TODO:  implement sale, and price
    // sale,
    // lowPrice,
    // highPrice,
  }
}

export const getTreasuresWithFilter = async ({
  username,
  filter,
  _sort,
  page = 0,
}) => {
  const whereQuery = getWhereQueryFromArgs({ username, filter })
  // Cannot use cursor pagination, since custom sorting is needed
  const skip = page * TREASURES_PER_PAGE
  const treasures = await db.treasure.findMany({
    skip,
    // Taking 9 elements may cause issues if there's only <9 to take?
    take: TREASURES_PER_PAGE,
    // take: Math.min(count - skip, TREASURES_PER_PAGE),
    where: whereQuery,
    // TODO: add sorting, see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#orderby
    // orderBy:
  })
  return treasures
}

export const getTreasuresWithFilterCount = async ({ username, filter }) => {
  const whereQuery = getWhereQueryFromArgs({ username, filter })
  // Note: count takes up to 2+ seconds to the query for large databases.
  return db.treasure.count({ where: whereQuery })
}
