import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { list } from 'src/lib/web3/treasureMarket'

// const PENDING_LISTED = 'PENDING_LISTED'
// const LISTED = 'LISTED'
// const PENDING_SOLD = 'PENDING_SOLD'
// const SOLD = 'SOLD'
// const PENDING_DELISTED = 'PENDING_DELISTED'
// const DELISTED = 'DELISTED'

export const validateListRequest = ({ treasure, amount }) => {
  if (!amount || typeof amount !== 'number' || amount <= 0)
    throw new EnvelopError(`Invalid amount.`)

  if (treasure.ownerId !== context.currentUser.id)
    throw new EnvelopError(`You don't own this Treasure.`)

  const currentMarketSale = treasure.marketSales[0]
  if (currentMarketSale && !currentMarketSale.isClosed)
    throw new EnvelopError(`This Treasure is already listed.`)
}

export const createNewTreasureListing = async ({ treasure, amount }) => {
  try {
    try {
      await checkGasAndAirdrop({ address: context.currentUser.address })
    } catch {
      // Do nothing
    }
    // Submit the transaction on behalf of the user
    const tx = await list({ treasure, amount })

    // Create the marketSale object
    const marketSale = await db.marketSale.create({
      data: {
        amount,
        treasure: { connect: { id: treasure.id } },
        seller: { connect: { id: context.currentUser.id } },
        listTx: {
          create: {
            id: tx.hash,
          },
        },
      },
    })
    return marketSale
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('createNewTreasureListing() ', e)
  }
}
