import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { getUsdcBalance } from 'src/lib/web3/tokens'
import { getTxStatus } from 'src/lib/web3'
import { list, unlist, buy } from 'src/lib/web3/treasureMarket'

const PENDING_LISTED = 'PENDING_LISTED'
const LISTED = 'LISTED'
const PENDING_SOLD = 'PENDING_SOLD'
const SOLD = 'SOLD'
const PENDING_DELISTED = 'PENDING_DELISTED'
const COMPLETE = 'COMPLETE'

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
  if (
    !currentMarketSale ||
    currentMarketSale.isClosed ||
    currentMarketSale.status === PENDING_LISTED
  )
    throw new EnvelopError(`This Treasure is not listed.`)
}

const validatePurchaseRequest = async ({ treasure }) => {
  const currentMarketSale = treasure.marketSales[0]
  if (!currentMarketSale || currentMarketSale.isClosed)
    throw new EnvelopError('This Treasure is not for sale.')

  if (treasure.ownerId === context.currentUser.id)
    throw new EnvelopError('You cannot buy your own Treasure.')

  const validStatuses = [LISTED, PENDING_SOLD, PENDING_DELISTED]
  if (!validStatuses.includes(currentMarketSale.status))
    throw new EnvelopError('This Treasure is not for sale.')

  // Check balance
  const memberBalance = await getUsdcBalance(context.currentUser.address)
  if (Number(memberBalance) < currentMarketSale.amount)
    throw new EnvelopError(
      `You don't have enough funds to purchase this Treasure.`
    )
}

export const processPendingTransactions = async ({ treasure }) => {
  try {
    // WARNING: the next line doesn't account for re-orgs.
    // marketSales marked completed are not re-checked
    let currentMarketSale = treasure.marketSales[0]
    if (!currentMarketSale) return treasure
    let { isClosed } = currentMarketSale
    if (isClosed) return treasure
    let transactions = {}

    await Promise.all(
      ['listTx', 'unlistTx'].map(async (type) => {
        let tx = currentMarketSale[type]
        if (!tx) return

        // Check them all
        const newStatus = await getTxStatus(tx.id)
        if (newStatus !== tx.status) {
          // Status has changed
          tx = await db.transaction.update({
            where: { id: tx.id },
            data: {
              status: newStatus,
            },
          })
          transactions[type] = tx

          if (type === 'listTx' && tx.status === COMPLETE) {
            currentMarketSale = await db.marketSale.update({
              where: { id: currentMarketSale.id },
              data: { status: LISTED },
            })
          } else if (type === 'unlistTx' && tx.status === COMPLETE) {
            isClosed = true
            currentMarketSale = await db.marketSale.update({
              where: { id: currentMarketSale.id },
              data: {
                status: DELISTED,
                isClosed: true,
              },
            })
          }
        }
        transactions[type] = tx
      })
    )

    await Promies.all(
      currentMarketSale.saleTransactions.map((tx) => {
        const newStatus = await getTxStatus(tx.id)
        if (newStatus !== tx.status) {
          // do something
        }
      })
    )

    const newtreasure = treasure
    newtreasure.marketSales[0] = {
      ...currentMarketSale,
      isClosed,
      ...transactions,
    }
    return newtreasure
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('processPendingTransactions()', e)
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
    throw new Error('removeTreasureListing() ', e)
  }
}

export const purchaseTreasure = async ({ treasure }) => {
  const updatedTreasure = await processPendingTransactions({ treasure })
  await validatePurchaseRequest({ treasure: updatedTreasure })
  try {
    try {
      await checkGasAndAirdrop({ address: context.currentUser.address })
    } catch {
      // Do nothing
    }
    // Submit the transaction on behalf of the user
    const tx = await buy({ treasure })

    // Update the marketSale object
    const marketSale = await db.marketSale.update({
      where: {
        id: treasure.marketSales[0].id,
      },
      data: {
        status: PENDING_SOLD,
        saleTransactions: {
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
    throw new Error('purchaseTreasure() ', e)
  }
}
