const fs = require('fs-extra')
const path = require('path')
const dotenv = require('dotenv')
const { performance } = require('perf_hooks')
var { parse } = require('csv-parse')
const { PrismaClient } = require('@prisma/client')

import { fetchMemberAndBlock } from '../../api/src/lib/members'

dotenv.config()

const IS_TEST = false

const FILENAME = IS_TEST ? 'test-block.csv' : 'block.csv'
const CHUNK_SIZE = IS_TEST ? 2 : 50

const FORCE_BLOCK = true // Block regardless of signed-in

const db = new PrismaClient()

// Run with this command:
// $(node tasks/environment/setupEnv) && yarn rw exec updateBlockList/updateBlockList

function chunk(arr, chunkSize) {
  if (chunkSize <= 0) throw 'Invalid chunk size'
  var R = []
  for (var i = 0; i < arr.length; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize))
  return R
}

const check = async () => {
  const blockedMemberCount = await db.member.count({
    where: { blocked: true },
  })
  console.log(`Total blocked members: ${blockedMemberCount}`)
}

const update = async () => {
  var startTime = performance.now()
  console.log('Loading list...')
  const fileData = fs.readFileSync(path.join(__dirname, FILENAME))
  if (!fileData) throw 'No list found'

  await parse(fileData, { columns: false, trim: true }, async (err, list) => {
    if (err) throw err

    // Break into chunks
    const chunks = chunk(list, CHUNK_SIZE)
    console.log(`Total items: ${list.length}`)
    console.log(`Total chunks: ${chunks.length}`)
    console.log(`Chunk size: ${chunks.length}`)

    for (let i = 0; i < chunks.length; ++i) {
      // Create all members in the db
      await Promise.all(
        chunks[i].map(async (row) => {
          await fetchMemberAndBlock(row[0], FORCE_BLOCK)
        })
      )
      console.log(`Finished chunk #${i}`)
    }
    await check()
    var endTime = performance.now()
    console.log(
      `Duration: ${((endTime - startTime) / 1000).toFixed(3)} seconds`
    )
  })
}

update()
check()
