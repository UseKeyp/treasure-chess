import { db } from 'src/lib/db'
import achievementsList from '@treasure-chess/chess-achievements/src/achievementsList'

import { totalSupply } from 'src/lib/web3/treasure'

// per active user (minted or used the marketplace)
const getMintPurchaseData = async () => {
  const total = await db.mintPurchase.count()
  const RESERVATION = await db.mintPurchase.count({
    where: { orderStatus: 'RESERVATION' },
  })
  const COMPLETE = await db.mintPurchase.count({
    where: { orderStatus: 'COMPLETE' },
  })
  const WYRE = await db.mintPurchase.count({
    where: { paymentType: 'WYRE' },
  })
  const MINTCREDIT = await db.mintPurchase.count({
    where: { paymentType: 'MINTCREDIT' },
  })
  const UNSUBMITTED = await db.mintPurchase.count({
    where: { txStatus: 'UNSUBMITTED' },
  })
  const SUBMITTED = await db.mintPurchase.count({
    where: { txStatus: 'SUBMITTED' },
  })
  const completeTx = await db.mintPurchase.count({
    where: { txStatus: 'COMPLETE' },
  })
  const FAILED = await db.mintPurchase.count({
    where: { txStatus: 'FAILED' },
  })

  return {
    sales: {
      total: total * 3,
    },
    count: {
      total,
      orderStatus: {
        COMPLETE,
        RESERVATION,
      },
      paymentType: {
        WYRE,
        MINTCREDIT,
      },
      txStatus: {
        UNSUBMITTED,
        SUBMITTED,
        COMPLETE: completeTx,
        FAILED,
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
      const count = await db.marketSale.aggregate({
        where: {
          status: 'SOLD',
          treasure: { achievements: { has: chiev.value } },
        },
        _sum: { amount: true },
      })
      achievementsSales[chiev.name] = count
      // TODO:  combine these
      await db.marketSale.count({
        where: {
          status: 'SOLD',
          treasure: { achievements: { has: chiev.value } },
        },
      })
      achievementsCount[chiev.name] = count
    })
  )

  const rarities = ['Good', 'Great', 'Ultra', 'Mythic']
  const raritySales = {}
  const rarityCount = {}
  let totalSales = 0
  await Promise.all(
    rarities.map(async (name) => {
      const res = await db.marketSale.aggregate({
        where: {
          treasure: { rarity: 'Good' },
          status: 'SOLD',
        },
        _sum: { amount: true },
      })
      console.log(res)
      const {
        _sum: { amount },
      } = res
      raritySales[name] = amount
      totalSales += amount
    })
  )

  let minterEarningsFirstSale = 0
  treasures.map((treasure) => {
    const index = treasure.marketSales.indexOf((sale) => sale.isClosed)
    if (index)
      minterEarningsFirstSale += treasure.marketSales[index].amount * 0.95
  })

  const platformFees = totalSales * 0.05
  // Strictly earned after the first sale
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
    where: { address: { startsWith: '0x' } },
    // include: {
    //   mintPurchases: { orderBy: { createdAt: 'desc' } },
    //   marketSalesSold: { orderBy: { updatedAt: 'desc' } },
    //   marketSalesPurchased: { orderBy: { updatedAt: 'desc' } },
    //   treasuresOwned: { orderBy: { createdAt: 'desc' } },
    //   treasuresMinted: { orderBy: { createdAt: 'desc' } },
    // },
  })

  // // Active: minted, bought, sold, listed
  // const activeMembers = members.map((user) => {
  //   if (user.mint) return user
  // })

  return { count: { total } }
}

const getCalculatedData = async () => {
  const mintsPerMember = mintPurchase.total / member.total
  const treasresPerMember = treasure.total / member.total

  // per achievement (specific date range)
  // avg sale price
  //
  // per rarity (specific date range)
  // # cards
  // avg sale price
  // # sales

  return {
    averages: {
      mintsPerMember,
      treasresPerMember,
    },
    // marketSale,
  }
}
export const getMetrics = async ({ _startTime, _endTime }) => {
  try {
    // TODO: impleent time-constraint
    // const whereTimeConstraint = {}

    const mintPurchase = await getMintPurchaseData()
    const treasure = await getTreasureData()
    const member = await getMemberData()
    const marketSale = await getMarketSaleData()
    const calculated = await getCalculatedData({
      mintPurchase,
      treasure,
      member,
      marketSale,
    })
    console.log(calculated)

    // TODO: Uncomment when not on an airplane
    // const supply = await totalSupply()
    const supply = 0
    const chainData = {
      treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
      marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
      totalSupply: supply,
      networkName: process.env.ETHEREUM_NETWORK_NAME,
    }

    return {
      member,
      treasure,
      marketSale,
      mintPurchase,
      chainData,
      calculated,
    }
  } catch (e) {
    /* eslint-disable-next-line no-console*/
    console.log(e)
    throw `getMetrics() ${e}`
  }
}
