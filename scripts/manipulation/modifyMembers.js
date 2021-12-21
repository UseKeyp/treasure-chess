/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const { performance } = require('perf_hooks')
const readline = require('readline')

dotenv.config()
const db = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('close', function () {
  console.log('\nExiting!')
  process.exit(0)
})

async function main() {
  const whereQuery = { mintCredits: { gte: 0 } }
  const membersAffected = await db.member.count({
    where: whereQuery,
  })
  await rl.question(
    `This will update ${membersAffected} members. Type "yes" to continue.`,
    async (yesOrNo) => {
      if (yesOrNo === 'yes') {
        var startTime = performance.now()
        const updateResults = await db.member.updateMany({
          where: whereQuery,
          data: { mintCredits: 6 },
        })
        var endTime = performance.now()
        console.log(`Modified ${updateResults.count} members`)
        console.log(
          `Total: ${((endTime - startTime) / 1000).toFixed(3)} seconds`
        )
        rl.close()
      } else {
        rl.close()
      }
    }
  )
}

const modify = async () => {
  await main()
  await db.$disconnect()
}
export default modify
