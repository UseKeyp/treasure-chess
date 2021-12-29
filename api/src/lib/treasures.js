import { db } from 'src/lib/db'

const {
  TREASURES_PER_PAGE,
  filters,
} = require('@treasure-chess/treasure-filters')

// NOTE: any updates to this function should also be made in /scripts/seed
export const generateTreasureData = ({ game, title, minter, mintPurchase }) => {
  return {
    id: game.treasureId,
    black: { connect: { id: game.black.id } },
    white: { connect: { id: game.white.id } },
    ...(game.winnerId && { winner: { connect: { id: game.winnerId } } }), // Optional
    minter: { connect: { id: minter.id } },
    owner: { connect: { id: minter.id } },
    title,
    cardColor: game.cardColor,
    gifUrl: game.gifUrl,
    blackRating: game.blackRating,
    whiteRating: game.whiteRating,
    blackRatingDelta: game.blackRatingDelta,
    whiteRatingDelta: game.whiteRatingDelta,
    blackMasterTitle: game.black.title,
    whiteMasterTitle: game.white.title,
    timeControl: game.timeControl,
    termination: game.termination,
    boardLayout: game.boardLayout,
    endTime: game.endTime,
    outcome: game.outcome,
    event: game.event,
    moves: game.moves,
    moveCount: game.moveCount,
    ruleVariant: game.ruleVariant,
    externalUrl: game.externalUrl,
    opening: game.opening,
    rarity: game.rarity,
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
  const outcomeQuery = filterObj.outcome
    ? {
        OR: filterObj.outcome.split(',').map((outcome) => ({ outcome })),
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
    ...(outcomeQuery && outcomeQuery),
    ...(moveCountQuery && moveCountQuery),
    ...(filterObj.opening && { opening: filterObj.opening }),
    ...(filterObj.color && { cardColor: filterObj.color }),
    ...(filterObj.title && { title: { contains: filterObj.title } }),
    ...(filterObj.termination && { termination: filterObj.termination }),
    ...(filterObj.timeControl && { timeControl: filterObj.timeControl }),
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
  // Note: count takes up to 2+ seconds to the query for large db (1M+ elements)
  return db.treasure.count({ where: whereQuery })
}
