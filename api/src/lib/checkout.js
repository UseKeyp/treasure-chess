const stripe = require('stripe')
import { db } from 'src/lib/db'
import { processDepositOrder } from 'src/lib/wyre'
import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
const endpointSecret =
  'whsec_9b44ae98a6e0e6b55e47482362f86e6d03f0aaabc0a971d589e14eb2f45cd055'

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

// const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)

export const processOrder = async ({ body, stripeSignature }) => {
  let orderId
  let reservation
  body && ({ reservation, orderId } = body)
  try {
    if (stripeSignature) {
      // Stripe order
      return logger.debug({ custom: body }, 'processOrder')
    } else {
    }
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
    await sendDiscordAdminAlert({
      embed: {
        color: 3066993,
        title: `✨💳  Wyre debit card mint success!`,
        description: `Wyre order ID: ${orderId}
  member: ${mintPurchase.member.username}
  mintPurchase: ${mintPurchase.id}`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
  } catch (e) {
    await sendDiscordAdminAlert({
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
