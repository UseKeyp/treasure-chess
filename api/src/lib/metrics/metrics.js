import { db } from 'src/lib/db'
import achievementsList from '@treasure-chess/chess-achievements/src/achievementsList'

import { logger } from 'src/lib/logger'

import { totalSupply } from 'src/lib/web3/treasure'

export const getChainData = async () => {
  let supply = ''
  try {
    supply = await totalSupply()
  } catch (e) {
    logger.error(e)
  }
  return {
    treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
    marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
    totalSupply: supply,
    networkName: process.env.ETHEREUM_NETWORK_NAME,
    environment: process.env.ENVIRONMENT,
    nodeEnvironment: process.env.NODE_ENV,
  }
}

// per active user (minted or used the marketplace)
const getMintPurchaseData = async () => {
  const total = await db.mintPurchase.count()
  const WYRE_ORDER_RESERVATION = await db.mintPurchase.count({
    where: { orderStatus: 'RESERVATION' },
  })
  const WYRE_ORDER_COMPLETE = await db.mintPurchase.count({
    where: { orderStatus: 'COMPLETE' },
  })
  const WYRE = await db.mintPurchase.count({
    where: { paymentType: 'WYRE' },
  })
  const MINTCREDIT = await db.mintPurchase.count({
    where: { paymentType: 'MINTCREDIT' },
  })
  const PENDING = await db.mintPurchase.count({
    where: { status: 'PENDING' },
  })
  const COMPLETE = await db.mintPurchase.count({
    where: { status: 'COMPLETE' },
  })
  const FAILED = await db.mintPurchase.count({
    where: { status: 'FAILED' },
  })
  const TX_SUBMITTED = await db.mintPurchase.count({
    where: { transaction: { status: 'SUBMITTED' } },
  })
  const TX_COMPLETE = await db.mintPurchase.count({
    where: { transaction: { status: 'COMPLETE' } },
  })
  const TX_FAILED = await db.mintPurchase.count({
    where: { transaction: { status: 'FAILED' } },
  })

  return {
    sales: {
      total: total * 3,
    },
    count: {
      total,
      orderStatus: {
        COMPLETE: WYRE_ORDER_COMPLETE,
        RESERVATION: WYRE_ORDER_RESERVATION,
      },
      status: {
        COMPLETE,
        PENDING,
        FAILED,
      },
      paymentType: {
        WYRE,
        MINTCREDIT,
      },
      txStatus: {
        SUBMITTED: TX_SUBMITTED,
        COMPLETE: TX_COMPLETE,
        FAILED: TX_FAILED,
      },
    },
  }
}

const getTreasureData = async () => {
  const total = await db.treasure.count()
  const Good = await db.treasure.count({ where: { rarity: 'Good' } })
  const Great = await db.treasure.count({ where: { rarity: 'Great' } })
  const Ultra = await db.treasure.count({ where: { rarity: 'Ultra' } })
  const Mythic = await db.treasure.count({ where: { rarity: 'Mythic' } })

  const achievements = {}
  await Promise.all(
    achievementsList.map(async (chiev) => {
      const count = await db.treasure.count({
        where: { achievements: { has: chiev.value } },
      })
      achievements[chiev.name] = count
    })
  )

  return {
    count: {
      total,
      rarity: {
        Good,
        Great,
        Ultra,
        Mythic,
      },
      achievements,
    },
  }
}

const getMarketSaleData = async () => {
  const totalSalesCount = await db.marketSale.count()
  const isClosed = await db.marketSale.count({
    where: {
      isClosed: true,
    },
  })
  const isOpen = totalSalesCount - isClosed
  const PENDING_LISTED = await db.marketSale.count({
    where: { status: 'PENDING_LISTED' },
  })
  const LISTED = await db.marketSale.count({
    where: { status: 'LISTED' },
  })
  const PENDING_SOLD = await db.marketSale.count({
    where: { status: 'PENDING_SOLD' },
  })
  const SOLD = await db.marketSale.count({
    where: { status: 'SOLD' },
  })
  const PENDING_DELISTED = await db.marketSale.count({
    where: { status: 'PENDING_DELISTED' },
  })
  const DELISTED = await db.marketSale.count({
    where: { status: 'DELISTED' },
  })
  const achievementsCount = {}
  const achievementsSales = {}
  await Promise.all(
    achievementsList.map(async (chiev) => {
      const {
        _sum: { amount: total },
        _count: count,
        _avg: { amount: average },
      } = await db.marketSale.aggregate({
        where: {
          status: 'SOLD',
          treasure: { achievements: { has: chiev.value } },
        },
        _avg: { amount: true },
        _sum: { amount: true },
        _count: true,
      })
      achievementsSales[chiev.name] = { total, average }
      achievementsCount[chiev.name] = count
    })
  )

  const rarities = ['Good', 'Great', 'Ultra', 'Mythic']
  const raritySales = {}
  const rarityCount = {}
  let totalSales = 0
  await Promise.all(
    rarities.map(async (rarity) => {
      const {
        _sum: { amount: total },
        _count: count,
        _avg: { amount: average },
      } = await db.marketSale.aggregate({
        where: {
          treasure: { rarity },
          status: 'SOLD',
        },
        _avg: { amount: true },
        _sum: { amount: true },
        _count: true,
      })
      raritySales[rarity] = { total, average }
      rarityCount[rarity] = count
      totalSales += total
    })
  )

  let minterEarningsFirstSale = 0
  const treasures = await db.treasure.findMany({
    include: { marketSales: { orderBy: { updatedAt: 'asc' } } },
  })
  treasures.map((treasure) => {
    const index = treasure.marketSales.indexOf((sale) => sale.isClosed)
    if (index) {
      const increment = treasure.marketSales[index]?.amount * 0.95 || 0
      minterEarningsFirstSale += increment
    }
  })

  const platformFees = totalSales * 0.05
  // minterEarningsResidual are earned only after the first sale
  const minterEarningsResidual = (totalSales - minterEarningsFirstSale) * 0.05
  const minterEarnings = minterEarningsResidual + minterEarningsFirstSale

  return {
    sales: {
      total: totalSales,
      platformFees,
      minterEarnings,
      minterEarningsFirstSale,
      minterEarningsResidual,
      rarity: raritySales,
      achievements: achievementsSales,
    },
    count: {
      total: totalSalesCount,
      isClosed: {
        true: isClosed,
        false: isOpen,
      },
      rarity: rarityCount,
      status: {
        PENDING_LISTED,
        LISTED,
        PENDING_SOLD,
        SOLD,
        PENDING_DELISTED,
        DELISTED,
      },
      achievements: achievementsCount,
    },
  }
}

const getMemberData = async () => {
  const total = await db.member.count({
    // Only users who have logged in
    where: { address: { startsWith: '0x' } },
  })
  const withoutAddress = await db.member.count({
    where: { address: null },
  })
  // select: {
  //   mintPurchases: { _count: true },
  //   marketSalesSold: { _count: true },
  //   marketSalesPurchased: { _count: true },
  //   treasuresOwned: { _count: true },
  //   treasuresMinted: { _count: true },
  // },
  const minted = {}
  // const buckets = [1, 2, 5, 10, 20, 30, 40, 50, 75, 100, 150, 200, 250]

  // // Active: minted, bought, sold, listed
  // const activeMembers = members.map((user) => {
  //   if (user.mint) return user
  // })

  return { count: { total, withoutAddress, minted } }
}

export const getBusinessMetrics = async () => {
  try {
    const mintPurchase = await getMintPurchaseData()
    const treasure = await getTreasureData()
    const member = await getMemberData()
    const marketSale = await getMarketSaleData()
    const chainData = await getChainData()

    return {
      member,
      treasure,
      marketSale,
      mintPurchase,
      chainData,
    }
  } catch (e) {
    /* eslint-disable-next-line no-console*/
    logger.error(e)
    throw `getBusinessMetrics() ${e}`
  }
}
