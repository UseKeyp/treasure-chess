import filters, { TREASURES_PER_PAGE } from '@treasure-chess/treasure-filters'
// Convert text names to values
const filterValuesByNameObj = Object.values(filters).reduce((acc, arrayObj) => {
  return {
    ...acc,
    ...arrayObj.reduce((acc2, obj) => ({ ...acc2, [obj.name]: obj.value }), {}),
  }
}, {})

const buildFilterParams = (searchParams) => {
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
            ? // when the array has a string with a comma
              // it means that the result from 'filterValuesByNameObj' is an array
              // and the type that we wanna for the 'filterObj' value from a key
              // is just an array of strings
              [...filterValuesByNameObj[value]]
            : // otherwise the return value from 'filterValuesByNameObj' is a string
              // not needing for spreading its value
              // if we spread a string the array fills up with the characters of that string
              [filterValuesByNameObj[value]]
      }
    } else {
      // otherwise we just add the value to the filterObj
      filterObj[key] = [value]
    }
  })
  return filterObj
}

const configUsernameQuery = (username) => {
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

const ownerQuery = (owner) =>
  owner
    ? {
        OR: [{ owner: { username: owner } }, { owner: { address: owner } }],
      }
    : null

const outcomeQuery = (filterObj) =>
  filterObj.outcome.length > 0
    ? {
        OR: filterObj.outcome.map((outcome) => ({ outcome })),
      }
    : null

const achievementQuery = (filterObj) =>
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

const moveCountQuery = (filterObj) =>
  filterObj.moveCount.length > 0
    ? {
        AND: [
          { moveCount: { gte: filterObj.moveCount[0] } },
          { moveCount: { lte: filterObj.moveCount[1] } },
        ],
      }
    : null
const titleQuery = (filterObj) =>
  filterObj.title.length > 0
    ? {
        OR: [
          { blackMasterTitle: filterObj.title[0] },
          { whiteMasterTitle: filterObj.title[0] },
        ],
      }
    : null
const openingQuery = (filterObj) =>
  filterObj.opening.length > 0
    ? {
        opening: filterObj.opening[0],
      }
    : null
const saleQuery = (filterObj) =>
  filterObj.sale.length > 0
    ? {
        OR: filterObj.sale.map((status) => ({
          marketSaleStatus: status,
        })),
      }
    : null

const configEnumFilter = (filterParams) => {
  const filterObj = {
    termination: '',
    cardColor: '',
    rarity: '',
    timeControl: '',
  }

  filterParams['termination']
    ? (filterObj['termination'] = filterParams['termination'][0])
    : delete filterObj['termination']
  filterParams['color']
    ? (filterObj['cardColor'] = filterParams['color'][0])
    : delete filterObj['cardColor']
  filterParams['rarity']
    ? (filterObj['rarity'] = filterParams['rarity'][0])
    : delete filterObj['rarity']
  filterParams['timeControl']
    ? (filterObj['timeControl'] = filterParams['timeControl'][0])
    : delete filterObj['timeControl']

  return filterObj
}

const buildFilterPayload = (filterParams, username, owner) => {
  const queryByUsername = configUsernameQuery(username)
  const queryByOwner = ownerQuery(owner)
  const queryByOutcome = outcomeQuery(filterParams)
  const queryByAchievement = achievementQuery(filterParams)
  const queryByMoveCount = moveCountQuery(filterParams)
  const queryByTitle = titleQuery(filterParams)
  const queryByOpening = openingQuery(filterParams)
  const queryBySale = saleQuery(filterParams)
  // termination
  // color
  // cardColor
  // timeControl
  const queryByEnums = configEnumFilter(filterParams)

  return {
    ...queryByUsername,
    ...queryByOwner,
    ...queryByAchievement,
    ...queryByOutcome,
    ...queryByMoveCount,
    ...queryByTitle,
    ...queryByOpening,
    ...queryBySale,
    ...queryByEnums,
    // TODO:  implement sale, and price
    // lowPrice,
    // highPrice,
  }
}
export { filters, buildFilterPayload, buildFilterParams, TREASURES_PER_PAGE }
