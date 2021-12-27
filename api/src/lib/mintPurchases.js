import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { validateTreasureTitle } from 'src/lib/helpers'
import { mintTreasureAndUpdatePurchase } from 'src/lib/web3'
import { fetchGame } from 'src/lib/games'

const COMPLETE = 'COMPLETE'

const fetchPendingMintPurchases = () => {
  return db.mintPurchase.findMany({
    where: {
      member: { id: context.currentUser.id },
      txStatus: { not: COMPLETE },
    },
    orderBy: [{ updatedAt: 'desc' }],
    include: { treasure: true, member: true },
  })
}

export const fetchMintPurchase = async ({ gameId, endTime, memberId }) => {
  const mintPurchases = await db.mintPurchase.findMany({
    where: {
      gameId,
      gameEndTime: endTime,
      memberId,
    },
  })
  // TODO: Need a better way for identifying unique purchases.
  // Maybe some string gameId-endTime-memberId ?
  if (mintPurchases?.length > 1)
    /* eslint-disable-next-line no-console */
    console.log('WARNING: Multiple mintPurchases for the same game')
  return mintPurchases[0] || null
}

export const validateMintRequest = async ({ gameId, endTime, title }) => {
  validateTreasureTitle(title)
  const existingPurchase = await fetchMintPurchase({
    gameId,
    gameEndTime: endTime,
    memberId: context.currentUser.id,
  })
  if (existingPurchase)
    throw new EnvelopError(`This Treasure cannot be minted right now.`)

  const game = await fetchGame({
    id: gameId,
    username: context.currentUser.username,
    endTime,
  })
  if (!game) throw new EnvelopError(`Member did not participate in this game.`)
}

// Part of the polling system. Triggers minting.
// TODO: (maybe) add admin ability to trigger this, rather than only by the user
export const processPendingPurchases = async () => {
  let pendingPurchases = await fetchPendingMintPurchases()
  pendingPurchases = await Promise.all(
    pendingPurchases.map((mintPurchase) => {
      if (mintPurchase.orderStatus !== COMPLETE) return mintPurchase
      if (mintPurchase.txStatus !== COMPLETE) {
        // Treasure not successfully minted. Proceed to mint!
        const newMintPurchase = await mintTreasureAndUpdatePurchase({
          mintPurchase,
        })
        return newMintPurchase
      }
      return mintPurchase
    })
  )
  console.log(pendingPurchases)
  return pendingPurchases
}
