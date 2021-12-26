import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { validateTreasureTitle } from 'src/lib/helpers'
import { mintTreasure } from 'src/lib/web3'
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
  if (!game)
    throw new EnvelopError(
      `Member ${username} did not participate in this game.`
    )
}

// Part of the polling system. Mints any new purchases
// TODO: (maybe) add admin ability to trigger this, rather than only by the user
export const processPendingPurchases = async () => {
  let pendingPurchases = await fetchPendingMintPurchases()
  let changes = false
  await Promise.all(
    pendingPurchases.map((mintPurchase) => {
      if (mintPurchase.orderStatus !== COMPLETE) return
      console.log(mintPurchase)
      if (mintPurchase.txStatus !== COMPLETE) {
        // Treasure not successfully minted. Proceed to mint!
        changes = true
        return mintTreasure({ mintPurchase })
      }
    })
  )
  // Refetch if there were changes
  if (changes) pendingPurchases = await fetchPendingMintPurchases()
  return pendingPurchases
}
