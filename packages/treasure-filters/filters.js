const achievementList = require('@treasure-chess/chess-achievements/src/achievementsList')

////////////////////////////////
// Items with name/value pair

// TODO: Remove if unused
// const ratings = [
//   { name: '< 750', value: [0, 750] },
//   { name: '750 - 999', value: [750, 999] },
//   { name: '1000 - 1499', value: [1000, 1499] },
//   { name: '1500 - 1999', value: [1500, 1999] },
//   { name: '2000 - 2199', value: [2000, 2199] },
//   { name: '2200 - 2399', value: [2200, 2399] },
//   { name: '2400+', value: [2400, 9999] },
// ]

const timeControlList = [
  {
    name: '1 minute',
    value: '60', // TODO: these will likely be strings
  },
  {
    name: '2 minutes',
    value: '120',
  },
  {
    name: '5 minutes',
    value: '300',
  },
  {
    name: '10 minutes',
    value: '600',
  },
  {
    name: '30 minutes',
    value: '1800',
  },
  {
    name: '1 hour',
    value: '3600',
  },
  {
    name: 'Untimed',
    value: null,
  },
]
const moveCountList = [
  { name: '< 10', value: [0, 9] },
  { name: '10 - 49', value: [10, 49] },
  { name: '50 - 99', value: [50, 99] },
  { name: '100 - 199', value: [100, 199] },
  { name: '200+', value: [200, 999] },
]

////////////////////////////////
// Items without name/value pair
const titleList = ['gm', 'im', 'nm']
const openingList = [
  'Any',
  "King's Pawn Game",
  "Queen's Gambit",
  'Ruy Lopez',
  'French Defense',
  'Caro-Kann',
  'Reti Opening',
  'English',
  'Norwegian', // Not in chess-achiemvements?
  "Bird's Opening",
  'Scandinavian',
  'Scotch Game',
]
const colorList = ['white', 'black']
const terminationList = [
  'Any',
  'Checkmate',
  'Resignation',
  'Stalemate',
  'Time',
  'Repetition',
  'Agreement',
  'Insufficient Material',
]
const rarityList = ['Good', 'Great', 'Ultra', 'Mythic']
const saleList = ['For Sale', 'Unlisted']
const outcomeList = ['black', 'white', 'draw']

const sortList = [
  'Most Rare',
  'Least Rare',
  'Price: High to Low',
  'Price: Low to High',
  'Newest First',
  'Oldest First',
  'Played: Newest',
  'Played: Oldest',
]

const filters = {
  achievementList,
  openingList,
  colorList,
  titleList,
  timeControlList,
  terminationList,
  moveCountList,
  rarityList,
  saleList,
  outcomeList,
  sortList,
}

const TREASURES_PER_PAGE = 9

module.exports = filters
module.exports.TREASURES_PER_PAGE = TREASURES_PER_PAGE
