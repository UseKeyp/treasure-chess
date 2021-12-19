/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

const exampleMembers = require('./member')
const exampleTreasures = require('./treasure')
const { generateRandomMembers, generateRandomTreasures } = require('./helpers')

dotenv.config()
const db = new PrismaClient()

async function main() {
  let members = exampleMembers
  let treasures = exampleTreasures

  if (true) {
    const totalTreasures = 120
    const highestMemberId = await db.member.count()
    members = generateRandomMembers(
      Math.floor(totalTreasures / 3),
      highestMemberId
    )
    const highestTreasureTokenId = await db.treasure.count()
    treasures = generateRandomTreasures(
      totalTreasures,
      highestTreasureTokenId,
      members
    )
  }
  await db.member.createMany({
    data: members,
  })
  await db.treasure.createMany({
    data: treasures,
  })
}

const seed = main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })

exports.default = seed
