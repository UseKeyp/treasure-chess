import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { getTxStatus } from 'src/lib/web3'
import { list, unlist } from 'src/lib/web3/treasureMarket'

// const PENDING_LISTED = 'PENDING_LISTED'
// const LISTED = 'LISTED'
// const PENDING_SOLD = 'PENDING_SOLD'
// const SOLD = 'SOLD'
const PENDING_DELISTED = 'PENDING_DELISTED'
// const DELISTED = 'DELISTED'

// txStatus
const SUBMITTED = 'SUBMITTED'
const FAILED = 'FAILED'
const COMPLETE = 'COMPLETE'

const validateListRequest = ({ treasure, amount }) => {
  if (!amount || typeof amount !== 'number' || amount <= 0)
    throw new EnvelopError(`Invalid amount.`)

  if (treasure.ownerId !== context.currentUser.id)
    throw new EnvelopError(`You don't own this Treasure.`)

  const currentMarketSale = treasure.marketSales[0]
  if (currentMarketSale && !currentMarketSale.isClosed)
    throw new EnvelopError(`This Treasure is already listed.`)
}

const validateUnlistRequest = ({ treasure }) => {
  if (treasure.ownerId !== context.currentUser.id)
    throw new EnvelopError(`You don't own this Treasure.`)

  const currentMarketSale = treasure.marketSales[0]
  if (!currentMarketSale || currentMarketSale.isClosed)
    throw new EnvelopError(`This Treasure is not listed.`)
}

const processPendingTransactions = async ({ treasure }) => {
  const transactions = await Promise.all(
    ['listTx', 'unlistTx', 'saleTx'].map(async (txType) => {
      const tx = treasure[txType]
      if (!tx) return
      if (tx.txStatus !== SUBMITTED) return
      const txStatus = await getTxStatus(tx.id)
      return await db.transaction.update({
        where: { id: tx.id },
        data: {
          txStatus,
        },
      })
    })
  )
  console.log(transactions)
  return transactions
}

export const createNewTreasureListing = async ({ treasure, amount }) => {
  validateListRequest({ treasure, amount })
  await processPendingTransactions({ treasure })
  try {
    // TODO: Cleanup previous listing if necessary and set `isClosed` to true

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

export const removeTreasureListing = async ({ treasure }) => {
  validateUnlistRequest({ treasure })
  await processPendingTransactions({ treasure })
  try {
    try {
      await checkGasAndAirdrop({ address: context.currentUser.address })
    } catch {
      // Do nothing
    }
    // Submit the transaction on behalf of the user
    const tx = await unlist({ treasure })

    // Update the marketSale object
    const marketSale = await db.marketSale.update({
      where: {
        id: treasure.marketSales[0].id,
      },
      data: {
        status: PENDING_DELISTED,
        unlistTx: {
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
