/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const memberData = require('./member')
const treasureData = require('./treasure')
const { generateMember, generateTreasure } = require('./helpers')

dotenv.config()
const db = new PrismaClient()

/*
 * Seed data is database data that needs to exist for your app to run.
 *
 * @see https://www.prisma.io/docs/reference/api-reference/command-reference#migrate-reset
 * @see https://www.prisma.io/docs/guides/prisma-guides/seed-database
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
 * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
 */
async function main() {
  // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
  // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany

  let membersToCreate = memberData
  let treasuresToCreate = treasureData

  // Set to false to only generate a few members & treasures
  if (true) {
    const count = Array(100).fill(null)
    membersToCreate = count.map((_, index) => {
      membersToCreate[index] = generateMember()
    })
    treasuresToCreate = count.map((_, index) => {
      treasuresToCreate[index] = generateTreasure(membersToCreate)
    })
  }
  console.log(membersToCreate)
  // Create members
  await Promise.all(
    membersToCreate.map(async (member) => {
      try {
        const record = await db.member.create({
          data: member,
        })
        console.log(record)
      } catch (e) {
        console.log("Couldn't create members")
        console.log(e)
      }
    })
  )
  // Create treasures
  await Promise.all(
    treasuresToCreate.map(async (treasure) => {
      try {
        const record = await db.treasure.create({
          data: treasure,
        })
        console.log(record)
      } catch (e) {
        console.log("Couldn't create treasures")
        console.log(treasure)
        console.log(e)
      }
    })
  )
}

const seed = main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })

exports.default = seed
