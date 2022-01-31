import { db } from 'src/lib/db'

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
  }
}

const getTreasureData = async () => {
  const total = await db.treasure.count()
  const Good = await db.treasure.count({ where: { rarity: 'Good' } })
  const Great = await db.treasure.count({ where: { rarity: 'Great' } })
  const Ultra = await db.treasure.count({ where: { rarity: 'Ultra' } })
  const Mythic = await db.treasure.count({ where: { rarity: 'Mythic' } })

  // per achievement (specific date range)
  // # cards
  // avg sale price
  // # sales
  //
  // per rarity (specific date range)
  // # cards
  // avg sale price
  // # sales

  return {
    total,
    rarity: {
      Good,
      Great,
      Ultra,
      Mythic,
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

  // TODO sum the totals for each category
  const Good = await db.marketSale.findMany({
    where: { treasure: { rarity: 'Good' }, status: 'SOLD' },
  })
  const Great = await db.marketSale.findMany({
    where: { treasure: { rarity: 'Great' }, status: 'SOLD' },
  })
  const Ultra = await db.marketSale.findMany({
    where: { treasure: { rarity: 'Ultra' }, status: 'SOLD' },
  })
  const Mythic = await db.marketSale.findMany({
    where: { treasure: { rarity: 'Mythic' }, status: 'SOLD' },
  })

  const treasures = await db.treasure.findMany({
    include: { marketSales: { orderBy: { updatedAt: 'asc' } } },
  })

  let minterEarningsFirstSale = 0
  treasures.map((treasure) => {
    const index = treasure.marketSales.indexOf((sale) => sale.isClosed)
    if (index)
      minterEarningsFirstSale += treasure.marketSales[index].amount * 0.95
  })

  const totalSales = Good + Great + Ultra + Mythic
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
      rarity: {
        Good,
        Great,
        Ultra,
        Mythic,
      },
    },
    count: {
      total: totalSalesCount,
      isClosed: {
        true: isClosed,
        false: isOpen,
      },
      status: {
        PENDING_LISTED,
        LISTED,
        PENDING_SOLD,
        SOLD,
        PENDING_DELISTED,
        DELISTED,
      },
    },
  }
}

const getMemberData = async () => {
  const members = await db.member.count({
    where: { address: { startsWith: '0x' } },
    // include: {
    //   mintPurchases: { orderBy: { createdAt: 'desc' } },
    //   marketSalesSold: { orderBy: { updatedAt: 'desc' } },
    //   marketSalesPurchased: { orderBy: { updatedAt: 'desc' } },
    //   treasuresOwned: { orderBy: { createdAt: 'desc' } },
    //   treasuresMinted: { orderBy: { createdAt: 'desc' } },
    // },
  })
  const total = members.length

  // // Active: minted, bought, sold, listed
  // const activeMembers = members.map((user) => {
  //   if (user.mint) return user
  // })

  return { total }
}

export const getMetrics = async ({ _startTime, _endTime }) => {
  try {
    // TODO: impleent time-constraint
    // const whereTimeConstraint = {}

    const mintPurchase = await getMintPurchaseData()
    const treasure = await getTreasureData()
    const member = await getMemberData()
    const marketSale = await getMarketSaleData()

    // TODO: Uncomment when not on an airplane
    // const supply = await totalSupply()
    const supply = 0
    const chainData = {
      treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
      marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
      totalSupply: supply,
      networkName: process.env.ETHEREUM_NETWORK_NAME,
    }

    const mintsPerMember = mintPurchase.total / member.total
    const treasresPerMember = treasure.total / member.total

    const calculated = {
      member: {
        mintsPerMember,
        treasresPerMember,
      },
      // marketSale,
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
