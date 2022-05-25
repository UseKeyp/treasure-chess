import filters from '@treasure-chess/treasure-filters'
// Convert text names to values
const filterValuesByNameObj = Object.values(filters).reduce((acc, arrayObj) => {
  return {
    ...acc,
    ...arrayObj.reduce((acc2, obj) => ({ ...acc2, [obj.name]: obj.value }), {}),
  }
}, {})

export const buildFilterParams = (searchParams) => {
  let filterObj = {
    outcome: [],
    achievements: [],
    moveCount: [],
    opening: [],
    title: [],
    sale: [],
  }
  searchParams.entries().forEach(([key, value]) => {
    // the properties from 'filters' are named with List in the end
    // so we must firstly look if the first item of each ie. 'outcome+List' = outcomeList
    // has an string or has a object as value of its keys. because the filter can have this two
    // different datatypes.
    if (typeof filters[key + 'List'][0] == 'object') {
      // if the filter property has an object as value of its keys
      // we must take the specific value from his key
      // looking in a key:value obj named 'filterValuesByNameObj'
      if (value.search(/,/) >= 0) {
        // if the actual iteration value is a string with a comma
        // we must split the string by comma and add each value to the filterObj
        filterObj[key] = value
          .split(',')
          .map((item) => filterValuesByNameObj[item])
      } else {
        // if the actual iteration value is a string without a comma
        // we just looka at the table 'filterValuesByNameObj' and add the value to the filterObj
        filterObj[key] =
          typeof filterValuesByNameObj[value] === 'object'
            ? [...filterValuesByNameObj[value]]
            : [filterValuesByNameObj[value]]
      }
    } else {
      // otherwise we just add the value to the filterObj
      filterObj[key] = [value]
    }
  })
  return filterObj
}

export const configUsernameQuery = (username) => {
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

export const ownerQuery = (owner) =>
  owner
    ? {
        OR: [{ owner: { username: owner } }, { owner: { address: owner } }],
      }
    : null

export const outcomeQuery = (filterObj) =>
  filterObj.outcome.length > 0
    ? {
        OR: filterObj.outcome.map((outcome) => ({ outcome })),
      }
    : null

export const achievementQuery = (filterObj) =>
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

export const moveCountQuery = (filterObj) =>
  filterObj.moveCount.length > 0
    ? {
        AND: [
          { moveCount: { gte: filterObj.moveCount[0] } },
          { moveCount: { lte: filterObj.moveCount[1] } },
        ],
      }
    : null
export const titleQuery = (filterObj) =>
  filterObj.title.length > 0
    ? {
        OR: [
          { blackMasterTitle: filterObj.title[0] },
          { whiteMasterTitle: filterObj.title[0] },
        ],
      }
    : null
export const openingQuery = (filterObj) =>
  filterObj.opening.length > 0
    ? {
        opening: filterValuesByNameObj[filterObj.opening[0]],
      }
    : null
export const saleQuery = (filterObj) =>
  filterObj.sale.length > 0
    ? {
        OR: filterObj.sale.map((status) => ({
          marketSaleStatus: status,
        })),
      }
    : null

export const buildFilterPayload = (filterParams, username, owner) => {
  const queryByUsername = configUsernameQuery(username)
  const queryByOwner = ownerQuery(owner)
  const queryByOutcome = outcomeQuery(filterParams)
  const queryByAchievement = achievementQuery(filterParams)
  const queryByMoveCount = moveCountQuery(filterParams)
  const queryByTitle = titleQuery(filterParams)
  const queryByOpening = openingQuery(filterParams)
  const queryBySale = saleQuery(filterParams)

  return {
    ...(queryByUsername && queryByUsername),
    ...(queryByOwner && queryByOwner),
    ...(queryByAchievement && queryByAchievement),
    ...(queryByOutcome && queryByOutcome),
    ...(queryByMoveCount && queryByMoveCount),
    ...(queryByTitle && queryByTitle),
    ...(queryByOpening && queryByOpening),
    ...(queryBySale && queryBySale),
    ...(filterParams.color && { cardColor: filterParams.color[0] }),
    ...(filterParams.termination && {
      termination: filterParams.termination[0],
    }),
    ...(filterParams.timeControl && {
      timeControl: filterParams.timeControl[0],
    }),
    ...(filterParams.rarity && { rarity: filterParams.rarity[0] }),
    // TODO:  implement sale, and price
    // lowPrice,
    // highPrice,
  }
}
