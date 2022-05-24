import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import filters, { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'
// Convert text names to values
const filterValuesByNameObj = Object.values(filters).reduce((acc, arrayObj) => {
  return {
    ...acc,
    ...arrayObj.reduce((acc2, obj) => ({ ...acc2, [obj.name]: obj.value }), {}),
  }
}, {})

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

// const getValueByName = (list, name) =>
//   list.find((item) => item.name === name).value

const getWhereQueryFromArgs = ({ username, filter, owner }) => {
  const searchParams = new URLSearchParams(filter)
  let filterObj = {
    outcome: [],
    achievements: [],
    moveCount: [],
    opening: [],
    title: [],
    sale: [],
  }

  // since every filter as array of objs send by name
  // and every filter as array of strings do not, we can do:
  searchParams.entries().forEach(([key, value]) => {
    if (typeof filters[key + 'List'][0] == 'object') {
      if (value.search(/,/) >= 0) {
        filterObj[key] = value
          .split(',')
          .map((item) => filterValuesByNameObj[item])
      } else {
        filterObj[key] =
          typeof filterValuesByNameObj[value] === 'object'
            ? [...filterValuesByNameObj[value]]
            : [filterValuesByNameObj[value]]
      }
    } else {
      filterObj[key] = [value]
    }
  })

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

  const outcomeQuery =
    filterObj.outcome.length > 0
      ? {
          OR: filterObj.outcome.map((outcome) => ({ outcome })),
        }
      : null
  const achievementQuery =
    filterObj.achievements.length > 0
      ? {
          OR: filterObj.achievements.map((chiev) => {
            return {
              achievements: {
                has: chiev,
              },
            }
          }),
        }
      : null
  const moveCountQuery =
    filterObj.moveCount.length > 0
      ? {
          AND: [
            { moveCount: { gte: filterObj.moveCount[0] } },
            { moveCount: { lte: filterObj.moveCount[1] } },
          ],
        }
      : null
  const titleQuery =
    filterObj.title.length > 0
      ? {
          OR: [
            { blackMasterTitle: filterObj.title[0] },
            { whiteMasterTitle: filterObj.title[0] },
          ],
        }
      : null
  const openingQuery =
    filterObj.opening.length > 0
      ? {
          opening: filterValuesByNameObj[filterObj.opening[0]],
        }
      : null
  const saleQuery =
    filterObj.sale.length > 0
      ? {
          OR: filterObj.sale.map((status) => ({
            marketSaleStatus: status,
          })),
        }
      : null

  return {
    ...(usernameQuery && usernameQuery),
    ...(ownerQuery && ownerQuery),
    ...(achievementQuery && achievementQuery),
    ...(outcomeQuery && outcomeQuery),
    ...(moveCountQuery && moveCountQuery),
    ...(titleQuery && titleQuery),
    ...(openingQuery && openingQuery),
    ...(saleQuery && saleQuery),
    ...(filterObj.color && { cardColor: filterObj.color[0] }),
    ...(filterObj.termination && { termination: filterObj.termination[0] }),
    ...(filterObj.timeControl && { timeControl: filterObj.timeControl[0] }),
    ...(filterObj.rarity && { rarity: filterObj.rarity[0] }),
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

export const getTreasuresWithFilter = async ({
  username,
  owner,
  filter,
  sort,
  page = 0,
}) => {
  const whereQuery = getWhereQueryFromArgs({ username, filter, owner, sort })
  const orderByQuery = getOrderByQueryFromArgs({ sort })
  // Cannot use cursor pagination, since custom sorting is needed
  const skip = page * TREASURES_PER_PAGE
  const treasures = await db.treasure.findMany({
    skip,
    include: {
      marketSales: {
        orderBy: { updatedAt: 'desc' },
        take: 1,
      },
    },
    // Taking 9 elements may cause issues if there's only <9 to take?
    take: TREASURES_PER_PAGE,
    // take: Math.min(count - skip, TREASURES_PER_PAGE),
    where: whereQuery,
    // TODO: add sorting, see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#orderby
    orderBy: orderByQuery,
  })
  logger.debug({ custom: treasures[0] }, 'one treasure')
  return treasures
}

export const getTreasuresWithFilterCount = async ({
  username,
  filter,
  owner,
}) => {
  const whereQuery = getWhereQueryFromArgs({ username, filter, owner })
  // Note: count takes up to 2+ seconds to the query for large db (1M+ elements)
  return db.treasure.count({ where: whereQuery })
}
