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
  const total = await db.treasure.count()

  // TODO sum the totals for each category
  const Good = await db.treasure.findMany({
    where: { treasure: { rarity: 'Good' }, status: 'SOLD' },
  })
  const Great = await db.treasure.findMany({
    where: { treasure: { rarity: 'Great' }, status: 'SOLD' },
  })
  const Ultra = await db.treasure.findMany({
    where: { treasure: { rarity: 'Ultra' }, status: 'SOLD' },
  })
  const Mythic = await db.treasure.findMany({
    where: { treasure: { rarity: 'Mythic' }, status: 'SOLD' },
  })

  const totalSales = Good + Great + Ultra + Mythic

  return {
    total,
    sales: {
      total: totalSales,
      Good,
      Great,
      Ultra,
      Mythic,
    },
  }
}

const getMemberData = async () => {
  const members = await db.member.findMany({
    where: { address: { startsWith: '0x' } },
    include: {
      mintPurchases: { orderBy: { createdAt: 'desc' } },
      marketSalesSold: { orderBy: { updatedAt: 'desc' } },
      marketSalesPurchased: { orderBy: { updatedAt: 'desc' } },
      treasuresOwned: { orderBy: { createdAt: 'desc' } },
      treasuresMinted: { orderBy: { createdAt: 'desc' } },
    },
  })
  const total = members.length

  // Active: minted, bought, sold, listed
  const activeMembers = users.map((user) => {
    if (user.mint) return user
  })

  return { total, active: {} }
}

export const getMetrics = async ({ _startTime, _endTime }) => {
  try {
    // TODO: impleent time-constraint
    // const whereTimeConstraint = {}

    const mintPurchase = await getMintPurchaseData()
    const treasure = await getTreasureData()
    const member = await getMemberData()
    const marketSale = await getMarketSaleData()

    const totalSupply = await totalSupply()
    const chainData = {
      treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
      marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
      totalSupply: supply,
      networkName: process.env.ETHEREUM_NETWORK_NAME,
    }

    const mintsPerMember = mintPurchase.total / member.total
    const treasresPerMember = treasure.total / member.total

    const totalSales = {}
    const sales = {}
    const calculated = {
      member: {
        mintsPerMember,
        treasresPerMember,
      },
      // marketSale,
    }

    return {
      user,
      treasure,
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
