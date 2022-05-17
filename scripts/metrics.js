const fs = require('fs-extra')
const path = require('path')
const dotenv = require('dotenv')
var { parse } = require('csv-parse')
const { PrismaClient } = require('@prisma/client')

import { getBusinessMetrics } from '../api/src/lib/metrics/metrics'

dotenv.config()

const db = new PrismaClient()
// Run command
// $(node tasks/environment/setupEnv) && yarn rw exec metrics

const countLogins = async () => {
  const signedInMemberCount = await db.member.count({
    where: { address: { not: null } },
  })
  console.log(`Total wallets: ${signedInMemberCount}`)
}

const getMetrics = async () => {
  const metrics = await getBusinessMetrics()
  console.log(metrics)
  fs.writeFile(
    path.join(__dirname, 'metrics.json'),
    JSON.stringify(metrics),
    (err) => {
      if (err) throw err
    }
  )
}

countLogins()
getMetrics()
