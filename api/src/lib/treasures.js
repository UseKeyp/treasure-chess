import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import filters, { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'

// NOTE: any updates to this function should also be made in /scripts/seed
export const generateTreasureData = ({ game, title, minter }) => {
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
    blackMasterTitle: game.black.masterTitle,
    whiteMasterTitle: game.white.masterTitle,
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
  }
}

const getValueByName = (list, name) =>
  list.find((item) => item.name === name).value

const getWhereQueryFromArgs = ({ username, filter, owner }) => {
  const searchParams = new URLSearchParams(filter)
  let filterObj = {}
  // Convert text names to values
  for (var pair of searchParams.entries()) {
    let value = pair[1]
    if (pair[0] === 'timeControl')
      value = getValueByName(filters.timeControlList, pair[1])
    else if (pair[0] === 'moveCount') {
      value = getValueByName(filters.moveCountList, pair[1])
    }
    filterObj[pair[0]] = value
  }

  const configUsernameQuery = () => {
    if (!username) return null

    const isManyUsernames = username.includes(',')
    let usernames = username.split(',')

    let player1 = isManyUsernames ? usernames[0] : username
    let player2 = isManyUsernames ? usernames[1] : username

    return {
      OR: [
        { white: { username: player1 } },
        { black: { username: player2 } },
        { white: { username: player2 } },
        { black: { username: player1 } },
      ],
    }
  }

  // Create each TreasureWhereInput
  const ownerQuery = owner
    ? {
        OR: [{ owner: { username: owner } }, { owner: { address: owner } }],
      }
    : null
  const usernameQuery = configUsernameQuery()

  const outcomeQuery = filterObj.outcome
    ? {
        OR: filterObj.outcome.split(',').map((outcome) => ({ outcome })),
      }
    : null
  const achievementQuery = filterObj.achievements
    ? {
        OR: filterObj.achievements.split(',').map((chiev) => ({
          achievements: {
            has: getValueByName(filters.achievementList, chiev),
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
  const titleQuery = filterObj.title
    ? {
        OR: [
          { blackMasterTitle: filterObj.title },
          { whiteMasterTitle: filterObj.title },
        ],
      }
    : null
  const openingQuery = filterObj.opening
    ? {
        opening: getValueByName(filters.openingList, filterObj.opening),
      }
    : null
  const saleQuery = filterObj.sale
    ? {
        OR: filterObj.sale.split(',').map((status) => ({
          marketSaleStatus: getValueByName(filters.saleList, status),
        })),
      }
    : null

  return {
    AND: [
      usernameQuery,
      ownerQuery,
      achievementQuery,
      outcomeQuery,
      moveCountQuery,
      titleQuery,
      openingQuery,
      saleQuery,
      filterObj.color && { cardColor: filterObj.color },
      filterObj.termination && { termination: filterObj.termination },
      filterObj.timeControl && { timeControl: filterObj.timeControl },
      filterObj.rarity && { rarity: filterObj.rarity },
    ].filter((query) => query),
    // TODO:  implement sale, and price
    // lowPrice,
    // highPrice,
  }
}

const getOrderByQueryFromArgs = ({ sort }) => {
  if (sort === undefined) return { createdAt: 'desc' }

  const idx = filters.sortList.indexOf(sort)

  switch (idx) {
    case 0:
      return { achievementScore: 'desc' }
    case 1:
      return { achievementScore: 'asc' }
    // TODO: sort price
    // case 2:
    //   return {price: 'desc'}
    //   break
    // case 3:
    //   return {price: 'desc'}
    //   break
    case 4:
      return { createdAt: 'desc' }
    case 5:
      return { createdAt: 'asc' }
    case 6:
      return { endTime: 'desc' }
    case 7:
      return { endTime: 'asc' }
  }
}

function matchTerminationFilterQueryToBackend(filter) {
  if (filter) {
    if (filter.includes('Draw+by+Agreement')) {
      filter = filter.toString().replace('Draw+by+Agreement', 'Agreement')
    }
    if (filter.includes('Draw+by+Repetition')) {
      filter = filter.toString().replace('Draw+by+Repetition', 'Repetition')
    }
    if (filter.includes('Insufficient+Material')) {
      filter = filter
        .toString()
        .replace('Insufficient+Material', 'Insufficient')
    }
    if (filter.includes('Draw+by+50-Move+Rule')) {
      filter = filter.toString().replace('Draw+by+50-Move+Rule', 'FiftyMove')
    }
    if (filter.includes('Opponent+King+Reached+the+Hill')) {
      filter = filter
        .toString()
        .replace('Opponent+King+Reached+the+Hill', 'KingOfTheHill')
    }
    if (filter.includes('Checked+for+the+Third+Time')) {
      filter = filter
        .toString()
        .replace('Checked+for+the+Third+Time', 'ThreeCheck')
    }
    if (filter.includes('Draw+by+Timeout+vs+Insufficient')) {
      filter = filter
        .toString()
        .replace('Draw+by+Timeout+vs+Insufficient', 'TimeVsInsufficient')
    }
    if (filter.includes('Bughouse+Partner+Lost')) {
      filter = filter
        .toString()
        .replace('Bughouse+Partner+Lost', 'BughousePartnerLose')
    }
    if (filter.includes('Losers+All+Captured')) {
      filter = filter
        .toString()
        .replace('Losers+All+Captured', 'LosersAllCaptured')
    }
    if (filter.includes('Losers+Stalemate')) {
      filter = filter.toString().replace('Losers+Stalemate', 'LosersStalemate')
    }
  }
  return filter
}

export const getTreasuresWithFilter = async ({
  username,
  owner,
  filter,
  sort,
  page = 0,
}) => {
  filter = matchTerminationFilterQueryToBackend(filter)
  const whereQuery = getWhereQueryFromArgs({ username, filter, owner, sort })
  const orderByQuery = getOrderByQueryFromArgs({ sort })
  logger.debug(`filter: ${filter}`)
  logger.debug(`owner: ${owner}`)
  // Cannot use cursor pagination, since custom sorting is needed
  const skip = page * TREASURES_PER_PAGE
  const treasures = await db.treasure.findMany({
    skip,
    include: { marketSales: { orderBy: { updatedAt: 'desc' }, take: 1 } },
    // Taking 9 elements may cause issues if there's only <9 to take?
    take: TREASURES_PER_PAGE,
    // take: Math.min(count - skip, TREASURES_PER_PAGE),
    where: whereQuery,
    // TODO: add sorting, see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#orderby
    orderBy: orderByQuery,
  })
  // logger.debug({ custom: treasures[0] }, 'one treasure')
  return treasures
}

export const getTreasuresWithFilterCount = async ({
  username,
  filter,
  owner,
}) => {
  filter = matchTerminationFilterQueryToBackend(filter)
  const whereQuery = getWhereQueryFromArgs({ username, filter, owner })
  // Note: count takes up to 2+ seconds to the query for large db (1M+ elements)
  return db.treasure.count({ where: whereQuery })
}
