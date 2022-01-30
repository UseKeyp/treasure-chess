//
//
// per achievement (specific date range)
// # cards
// avg sale price
// # sales
//
// per rarity (specific date range)
// # cards
// avg sale price
// # sales
//
// per user (specific date range)
// # mints
//
// per active user (minted or used the marketplace)

export const getMetrics = async ({ _startTime, _endTime }) => {
  try {
    // TODO: impleent time-constraint
    // const whereTimeConstraint = {}

    const allMints = await db.mintPurchase.findMany()
    const mintCount = allMints.length

    const allUsers = await db.users.findMany()
    const userCount = allUsers.length

    const allTreasures = await db.treasures.findMany()
    const treasureCount = allTreasures.length

    const mintsPerUser = mintCount / userCount
    const data = {
      global: {
        mints: mintCount,
        treasures: treasureCount,
        mintsPerUser,
      },
    }
    // average mints / user
    // total mints
    // total treasures
  } catch (e) {
    /* eslint-disable-next-line no-console*/
    console.log(e)
    throw `getMetrics() ${e}`
  }
}
