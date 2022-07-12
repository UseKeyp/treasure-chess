import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { validateTreasureTitle } from 'src/lib/helpers'
import { mintTreasureAndUpdatePurchase } from 'src/lib/web3'
import { sendDiscordAdminAlert } from 'src/lib/discord/admin'

import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { checkAndSetMarketApprovals } from 'src/lib/web3/treasureMarket'
import { transferUsdc } from 'src/lib/web3/tokens'
import { getTokenIdFromHashId } from 'src/lib/web3/treasure'
import { getUsdcBalance } from 'src/lib/web3/tokens.js'
import { fetchGame } from 'src/lib/games'
import { logger } from 'src/lib/logger'

export const COMPLETE = 'COMPLETE'
export const FAILED = 'FAILED'
export const PENDING = 'PENDING'

const AVAILABLE_CHECKOUT_PAYMENT_TYPES = ['WYRE', 'STRIPE']

export const processMintPurchaseOrder = async ({ mintPurchase, orderId }) => {
  await db.mintPurchase.update({
    where: { id: mintPurchase.id },
    // For Wyre, we must update the orderId
    data: { ...(orderId && { orderId }), orderStatus: 'COMPLETE' },
  })
  await sendDiscordAdminAlert({
    embed: {
      color: 3066993,
      title: `✨💳 ${mintPurchase.paymentType} card mint success!`,
      description: `member: ${mintPurchase.member.username}
    mintPurchase: ${mintPurchase.id}`,
      footer: { text: new Date().toString() },
    },
    channelName: 'orders',
  })
}

const fetchPendingMintPurchases = () => {
  return db.mintPurchase.findMany({
    where: {
      member: { id: context.currentUser.id },
      status: PENDING,
    },
    orderBy: [{ updatedAt: 'desc' }],
    include: {
      treasure: true,
      member: true,
      transaction: true,
      staleTransactions: true,
    },
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
    logger.warn('Multiple mintPurchases for the same game')
  return mintPurchases[0] || null
}

export const validateMintRequest = async ({
  gameId,
  endTime,
  title,
  paymentType,
}) => {
  if (paymentType && !AVAILABLE_CHECKOUT_PAYMENT_TYPES.includes(paymentType))
    throw new EnvelopError(`Provider "${paymentType}" currently unavailable.`)
  validateTreasureTitle(title)
  const existingPurchase = await fetchMintPurchase({
    gameId,
    gameEndTime: endTime,
    memberId: context.currentUser.id,
  })
  if (existingPurchase && !existingPurchase.status === FAILED)
    throw new EnvelopError(`Minting already in progress.`)

  const game = await fetchGame({
    id: gameId,
    username: context.currentUser.username,
    endTime,
    includeTreasureData: true,
  })
  if (!game) throw new EnvelopError(`You did not participate in this game.`)
  if (game.black.blocked)
    throw new EnvelopError(
      `Whoops! ${game.black.username} needs to sign in to Treasure Chess before you can mint Treasures they appear in.`
    )
  if (game.white.blocked)
    throw new EnvelopError(
      `Whoops! ${game.white.username} needs to sign in to Treasure Chess before you can mint Treasures they appear in.`
    )
  const tokenId = await getTokenIdFromHashId(game.treasureId)
  if (tokenId > 0)
    throw new EnvelopError(
      `This Treasure has already been minted with tokenId ${tokenId}.`
    )
}

export const processMintBalanceRequest = async ({
  gameId,
  endTime,
  title,
  paymentType,
}) => {
  try {
    await checkGasAndAirdrop({ member: context.currentUser })
    await checkAndSetMarketApprovals({ member: context.currentUser })
  } catch {
    // Do nothing
  }
  if (paymentType === 'MINTCREDIT') {
    if (context.currentUser.mintCredits < 1)
      throw new EnvelopError(`Insufficient mint credits`)
    await db.member.update({
      where: { id: context.currentUser.id },
      data: { mintCredits: { decrement: 1 } },
    })
  }
  if (paymentType === 'BALANCE_MUSDC') {
    const usdcBalance = await getUsdcBalance(context.currentUser.address)
    if (usdcBalance / process.env.WYRE_MINT_USD_PURCHASE_AMOUNT < 1)
      throw new EnvelopError(`Insufficient balance`)
    // Transfer funds from wallet to admin
    // NOTE: There is an exploit which allows minting many times while
    // the balance change tx is pending. We should check for pending purchases in the future.
    await transferUsdc({
      to: process.env.APP_ADMIN_WALLET_ADDRESS,
      amount: process.env.WYRE_MINT_USD_PURCHASE_AMOUNT,
    })
  }
  const mintPurchase = await db.mintPurchase.create({
    data: {
      member: { connect: { id: context.currentUser.id } },
      gameId,
      paymentType,
      orderStatus: 'COMPLETE',
      gameEndTime: endTime,
      title,
    },
  })
  return mintPurchase
}

// Part of the polling system. Triggers minting.
export const processPendingPurchases = async () => {
  let pendingPurchases = await fetchPendingMintPurchases()
  pendingPurchases = await Promise.all(
    pendingPurchases.map(async (mintPurchase) => {
      // logger.debug(
      //   { custom: { ...mintPurchase, member: 'REDACTED' } },
      //   'mintPurchase'
      // )
      if (mintPurchase.orderStatus !== COMPLETE) {
        var FIFTEEN_MINUTES = 15 * 60 * 1000
        const now = new Date()
        if (now - new Date(mintPurchase.createdAt) > FIFTEEN_MINUTES) {
          const updatedMintPurchase = await db.mintPurchase.update({
            where: { id: mintPurchase.id },
            data: { status: FAILED, orderStatus: COMPLETE },
          })
          return updatedMintPurchase
        }
        return mintPurchase
      }
      if (![COMPLETE, FAILED].includes(mintPurchase.status)) {
        // Treasure not successfully minted. Proceed to mint!
        logger.debug(`Pending Purchase: #${mintPurchase.id}`)
        return mintTreasureAndUpdatePurchase({ mintPurchase })
      }
      return mintPurchase
    })
  )
  // pendingPurchases[0] &&
  //   logger.debug(
  //     { custom: { ...pendingPurchases[0], member: 'REDACTED' } },
  //     'pendingPurchases[0]'
  //   )
  // logger.debug({ custom: pendingPurchases.length })
  return pendingPurchases
}
