import { db } from 'src/lib/db'
import { validateTreasureTitle } from 'src/lib/helpers'
import { EnvelopError } from '@envelop/core'

export const fetchPendingMintPurchases = () => {
  return db.mintPurchase.findMany({
    where: {
      member: { id: context.currentUser.id },
      txStatus: { not: 'COMPLETE' },
    },
    orderBy: [{ updatedAt: 'desc' }],
    include: { treasure: true },
  })
}

export const fetchMintPurchase = async () => {
  const mintPurchases = await db.mintPurchase.findMany({
    where: {
      gameId,
      gameEndTime: endTime,
      memberId: context.currentUser.id,
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
