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
  // per achievement (specific date range)
  // # cards
  // avg sale price
  // # sales
  //
  // per rarity (specific date range)
  // # cards
  // avg sale price
  // # sales

  return { total }
}
const getMemberData = async () => {
  const members = await db.member.findMany({
    where: { address: true },
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

    const mintsPerMember = mintPurchase.total / member.total
    const treasresPerMember = treasure.total / member.total

    const calculated = {
      mintsPerMember,
      treasresPerMember,
    }

    const totalSupply = await totalSupply()
    const chainData = {
      treasureAddress: process.env.CONTRACT_ADDRESS_TREASURE,
      marketAddress: process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
      totalSupply: supply,
      networkName: process.env.ETHEREUM_NETWORK_NAME,
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
