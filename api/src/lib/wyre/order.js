import Sentry from 'src/lib/sentry'
import { fetchOrder } from 'src/lib/wyre/wyre'
import { db } from 'src/lib/db'
import { sendDiscordAlert } from 'src/lib/discord/discord'
import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

const DISCORD_WYRE_DASHBOARD_URL = isProduction
  ? 'https://www.sendwyre.com/#/dashboard'
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

const processDepositOrder = async ({ order, reservation }) => {
  try {
    logger.debug({ custom: order }, 'order')
    const depositOrder = await db.depositOrder.findUnique({
      where: { reservation },
      include: { member: true },
    })
    logger.debug({ custom: depositOrder }, 'depositOrder')
    if (
      order?.status === 'COMPLETE' &&
      depositOrder &&
      depositOrder.status !== 'COMPLETE'
    ) {
      await db.depositOrder.update({
        where: { id: depositOrder.id },
        data: {
          status: 'COMPLETE',
          amount: order.usdPurchaseAmount,
          orderId: order.id,
          sourceCurrency: order.sourceCurrency,
          sourceAmount: order.sourceAmount,
          purchaseAmount: order.purchaseAmount,
          destCurrency: order.destCurrency,
          orderType: order.orderType,
        },
      })
      await sendDiscordAlert({
        embed: {
          color: 3066993, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          title: `🤑 Deposit Success!`,
          description: `Wyre order ID: ${order.id}
          sourceCurrency: ${order.sourceCurrency}
usdSourceAmount: **$${order.usdSourceAmount}**
usdPurchaseAmount: **$${order.usdPurchaseAmount}**
dest: ${order.dest}
fees: $${Number(order.usdSourceAmount) - Number(order.usdPurchaseAmount)}
user: https://treasure.chess.com/members/${depositOrder?.member?.username}`,
          footer: { text: new Date().toString() },
          type: 'link',
        },
        channelName: 'orders',
      })
    } else {
      let extraDetails = ''
      if (!depositOrder)
        extraDetails = `Couldn't update database for reservation ${reservation}.`
      await sendDiscordAlert({
        embed: {
          color: 2067276, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          title: `❓🤑 Deposit data received`,
          description: `See below to confirm if successful
${extraDetails && `\`${extraDetails}\``}

${JSON.stringify(order, undefined, 4)}
`,
          footer: { text: new Date().toString() },
        },
        channelName: 'orders',
      })
    }
  } catch (e) {
    await sendDiscordAlert({
      embed: {
        color: 2067276,
        title: `❓🤑 Deposit processing error`,
        description: `See below to confirm if successful.

${e}
${JSON.stringify(order, undefined, 4)}

[Wyre Dashboard](${DISCORD_WYRE_DASHBOARD_URL})`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processDepositOrder() ${e}`)
    Sentry.captureException(e)
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
    if (order.destCurrency === 'MUSDC')
      return processDepositOrder({ order, orderId, reservation })
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
      data: { orderId, orderStatus: 'COMPLETE' },
    })
  } catch (e) {
    await sendDiscordAlert({
      embed: {
        color: 16740982,
        title: `⛈️💳  Failed to process Wyre Order!`,
        description: `Wyre order ID: ${orderId}

${JSON.stringify(e)}

[Wyre Dashboard](${DISCORD_WYRE_DASHBOARD_URL})`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processOrder() ${e}`)
    Sentry.captureException(e)
  }
}
