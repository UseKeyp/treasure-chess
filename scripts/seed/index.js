/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const { performance } = require('perf_hooks')

const exampleMembers = require('./member')
const exampleTreasures = require('./treasure')
const { generateRandomMembers, generateRandomTreasures } = require('./helpers')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // NOTE: change these as desired
  const newTreasuresToCreate = 100
  // const newMembersToCreate = Math.floor(newTreasuresToCreate / 3)
  const newMembersToCreate = 30

  var startMemberGenTime = performance.now()
  // MEMBERS
  if (newMembersToCreate > 0) {
    console.log(`${newMembersToCreate} new Members `)
    const highestMemberId = await db.member.count()
    const randomMembers = generateRandomMembers(
      newMembersToCreate,
      highestMemberId
    )
    var endMemberGenTime = performance.now()
    console.log(
      `Gen: ${((endMemberGenTime - startMemberGenTime) / 1000).toFixed(
        3
      )} seconds`
    )
    var startMemberWriteTime = performance.now()
    await db.member.createMany({
      data: randomMembers,
    })
    var endMemberWriteTime = performance.now()
    console.log(
      `Write: ${((endMemberWriteTime - startMemberWriteTime) / 1000).toFixed(
        3
      )} seconds`
    )
    console.log('')
  }

  const members = await db.member.findMany()
  // TREASURES
  console.log(`${newTreasuresToCreate} new Treasures`)
  const highestTreasureTokenId = await db.treasure.count()
  var startTreasureGenTime = performance.now()
  const randomTreasures = generateRandomTreasures(
    newTreasuresToCreate,
    highestTreasureTokenId,
    members
  )
  var endTreasureGenTime = performance.now()
  console.log(
    `Gen: ${((endTreasureGenTime - startTreasureGenTime) / 1000).toFixed(
      3
    )} seconds`
  )
  var startTreasureWriteTime = performance.now()
  await db.treasure.createMany({
    data: randomTreasures,
  })
  var endTreasureWriteTime = performance.now()
  console.log(
    `Write: ${((endTreasureWriteTime - startTreasureWriteTime) / 1000).toFixed(
      3
    )} seconds`
  )
  console.log('')
  console.log(
    `Total: ${((endTreasureWriteTime - startMemberGenTime) / 1000).toFixed(
      3
    )} seconds`
  )
}

const seed = async () => {
  const rounds = 1
  for (var i = 0; i < rounds; i++) {
    console.log(`############ Round ${i + 1} of ${rounds} ################`)
    await main()
  }
  await db.$disconnect()
}
export default seed
