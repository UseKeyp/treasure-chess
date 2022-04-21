import Sentry from 'src/lib/sentry'
import { fetchOrder } from 'src/lib/wyre/wyre'
import { db } from 'src/lib/db'
import { sendDiscordAlert } from 'src/lib/discord/discord'
import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

const DISCORD_WYRE_DASHBOARD_URL = isProduction
  ? 'https://www.wyre.com/#/dashboard'
  : 'https://www.testwyre.com/#/dashboard'

const validateMintOrder = (order) => {
  try {
    if (order.status !== 'COMPLETE') throw "status' not COMPLETE"
    if (order.sourceCurrency !== 'USD') throw "sourceCurrency' is not USD"
    if (order.destCurrency !== 'USD') throw "destCurrency' is not USD"
    // TODO: Check if this is still valid we finalize the fee amount with Wyre
    // if (order.usdSourceAmount != process.env.WYRE_MINT_USD_SOURCE_AMOUNT)
    //   throw `usdSourceAmount' is not ${process.env.WYRE_MINT_USD_SOURCE_AMOUNT}`
    //
    // if (order.usdPurchaseAmount != process.env.WYRE_MINT_USD_PURCHASE_AMOUNT)
    //   throw `usdPurchaseAmount' is not ${process.env.WYRE_MINT_USD_PURCHASE_AMOUNT}`
    const destString = `account:${process.env.WYRE_ACCOUNT_ID_TREASURE}`
    if (order.dest !== destString) throw `dest' is not ${destString}`
  } catch (e) {
    throw Error(
      `Wyre mint order invalid: 'order.${e} . Received from Wyre: ${JSON.stringify(
        order
      )}`
    )
  }
}

export const processOrder = async ({ reservation, orderId }) => {
  try {
    let mintPurchase = await db.mintPurchase.findUnique({
      where: { orderId },
    })
    // Ensure orderId hasn't already used with a different reservation
    if (mintPurchase && mintPurchase.reservation !== reservation)
      throw new Error(
        `Wyre mint order invalid. orderId ${orderId} / reservation ${reservation} has already been used with reservation ${mintPurchase.reservation} and purchase #${mintPurchase.id}`
      )
    const order = await fetchOrder(orderId)
    if (order.status === 'PROCESSING') return // Don't throw errors and do nothing
    validateMintOrder(order)
    mintPurchase = await db.mintPurchase.findUnique({
      where: { reservation },
      include: { member: true },
    })
    if (!mintPurchase)
      throw new Error(
        `MintPurchase not found for reservation: ${reservation} orderId: ${orderId}`
      )
    Sentry.setUser({ username: mintPurchase.member.username })
    await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        orderId,
        orderStatus: 'COMPLETE',
      },
    })
  } catch (e) {
    logger.error(e)
    await sendDiscordAlert({
      embed: {
        color: 16740982,
        title: `⛈️💳  Failed to process Wyre Order!`,
        description: `Wyre order ID: ${orderId}

${e}

[Wyre Dashboard](${DISCORD_WYRE_DASHBOARD_URL})`,
        footer: {
          text: new Date().toString(),
        },
        type: 'link',
      },
      channelName: 'orders',
    })
    Sentry.captureException(e)
  }
}
