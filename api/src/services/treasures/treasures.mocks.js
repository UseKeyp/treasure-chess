import {
  generateRandomTreasures,
  generateRandomMembers,
} from '../../../../scripts/seed/helpers'

const members = generateRandomMembers(2, 0)
const treasuresLength = 20

const prices = [
  20, 1, 5, 3, 19, 13, 95, 2, 9, 567, 177, 12, 37, 13, 14, 15, 36, 1, 1, 2, 3,
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]

const generatedTreasures = generateRandomTreasures(treasuresLength, 0, members)

// generate treasures with prices
generatedTreasures.map((treasure, i) => {
  treasure['marketSaleStatus'] = 'LISTED'
  treasure['marketSales'] = {
    __typename: 'MarketSale',
    // randomize prices
    amount: prices[i],
    id: i + 1 + Math.floor(i * 20),
    status: 'LISTED',
  }
})

export { generatedTreasures }
