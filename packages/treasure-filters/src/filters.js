const {
  achievements: achievementList,
  ecoCodes: ecoCodeList,
} = require('@treasure-chess/chess-achievements')
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

const openingList = [
  { name: 'Any', value: 'Any' },
  { name: "King's Pawn Game", value: 'KingsPawnGame' },
  { name: "Queen's Gambit", value: 'QueensGambit' },
  { name: 'Ruy Lopez', value: 'RuyLopez' },
  { name: 'French Defense', value: 'FrenchDefense' },
  { name: 'Caro-Kann', value: 'CaroKann' },
  { name: 'Reti Opening', value: 'RetiOpening' },
  { name: 'English', value: 'English' },
  { name: 'Modern', value: 'Modern' },
  { name: "Bird's Opening", value: 'BirdsOpening' },
  { name: 'Scandinavian', value: 'Scandinavian' },
  { name: 'Scotch Game', value: 'ScotchGame' },
]

const terminationList = [
  { name: 'Any', value: 'Any' },
  {
    name: 'Checkmate',
    code: 'checkmated',
    value: 'Checkmate',
  },
  {
    name: 'Time',
    code: 'timeout',
    value: 'Time',
  },
  {
    name: 'Draw by Agreement',
    code: 'agreed',
    value: 'Agreement',
  },
  {
    name: 'Draw by repetition',
    code: 'repetition',
    value: 'Repetition',
  },
  {
    name: 'Resignation',
    code: 'resigned',
    value: 'Resignation',
  },
  {
    name: 'Stalemate',
    code: 'stalemate',
    value: 'Stalemate',
  },
  {
    name: 'Insufficient Material',
    code: 'insufficient',
    value: 'Insufficient',
  },
  {
    name: 'Draw by 50-move rule',
    code: '50move',
    value: 'FiftyMove',
  },
  {
    name: 'Abandoned',
    code: 'abandoned',
    value: 'Abandoned',
  },
  {
    name: 'Opponent king reached the hill',
    code: 'kingofthehill',
    Value: 'KingOfTheHill',
  },
  {
    name: 'Checked for the 3rd time',
    code: 'threecheck',
    value: 'ThreeCheck',
  },
  {
    name: 'Draw by timeout vs insufficient material',
    code: 'timevsinsufficient',
    value: 'TimeVsInsufficient',
  },
  {
    name: 'Bughouse partner lost',
    code: 'bughousepartnerlose',
    value: 'BughousePartnerLose',
  },
  {
    name: 'Losers all captured',
    code: 'losersallcaptured',
    value: 'LosersAllCaptured',
  },
  {
    name: 'Losers stalemate',
    code: 'losersstalemate',
    value: 'LosersStalemate',
  },
]
////////////////////////////////
// Items without name/value pair
const titleList = [
  'GM',
  'WGM',
  'IM',
  'WIM',
  'FM',
  'WFM',
  'NM',
  'CM',
  'WCM',
  'WNM',
]
const colorList = ['white', 'black']
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
  ecoCodeList,
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

export const TREASURES_PER_PAGE = 9

export const getAchievementNamesFromValues = (achievements) =>
  achievements.map((value) => {
    let chiev = achievementList.find((item, index) => item.value === value)
    if (!chiev) return value
    return chiev.name
  })

export default filters
