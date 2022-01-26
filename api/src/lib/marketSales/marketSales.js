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

const validateCreateNewListingRequest = ({ treasure, amount }) => {
  if (!amount || typeof amount !== 'number' || amount <= 0)
    throw new EnvelopError(`Invalid amount.`)

  if (treasure.ownerId !== context.currentUser.id)
    throw new EnvelopError(`You don't own this Treasure.`)

  const currentMarketSale = treasure.marketSales[0]
  if (currentMarketSale && !currentMarketSale.isClosed)
    throw new EnvelopError(`This Treasure is already listed.`)
}

const validateRemoveListingRequest = ({ treasure }) => {
  if (treasure.ownerId !== context.currentUser.id)
    throw new EnvelopError(`You don't own this Treasure.`)

  const currentMarketSale = treasure.marketSales[0]
  if (!currentMarketSale || currentMarketSale.isClosed)
    throw new EnvelopError(`This Treasure is not listed.`)
}

export const processPendingTransactions = async ({ treasure }) => {
  try {
    const currentMarketSale = treasure.marketSales[0]
    if (!currentMarketSale) return treasure
    const { listTx, unlistTx, saleTx } = currentMarketSale
    let transactions = { listTx, unlistTx, saleTx }
    await Promise.all(
      ['listTx', 'unlistTx', 'saleTx'].map(async (txType) => {
        const tx = transactions[txType]
        if (!tx) return tx
        if (tx.txStatus !== SUBMITTED) return tx
        const txStatus = await getTxStatus(tx.id)
        const newTx = await db.transaction.update({
          where: { id: tx.id },
          data: {
            txStatus,
          },
        })
        // TODO: Update Market Sale `status` and `isClosed`
        transactions[txType] = newTx
      })
    )
    const newtreasure = treasure
    newtreasure.marketSales[0] = { ...currentMarketSale, ...transactions }
    return newtreasure
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(e)
  }
}

export const createNewTreasureListing = async ({ treasure, amount }) => {
  const updatedTreasure = await processPendingTransactions({ treasure })
  validateCreateNewListingRequest({ treasure: updatedTreasure, amount })
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

export const removeTreasureListing = async ({ treasure }) => {
  const updatedTreasure = await processPendingTransactions({ treasure })
  validateRemoveListingRequest({ treasure: updatedTreasure })
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
