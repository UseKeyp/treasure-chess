const stripe = require('stripe')
import { db } from 'src/lib/db'
import { processWyreWebhook } from 'src/lib/wyre'
import { processStripeWebhook } from 'src/lib/stripe'
import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
const endpointSecret =
  'whsec_9b44ae98a6e0e6b55e47482362f86e6d03f0aaabc0a971d589e14eb2f45cd055'
import { logger } from 'src/lib/logger'

// const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)

export const processOrder = async ({ body, stripeSignature }) => {
  let orderId
  let reservation
  body && ({ reservation, orderId } = body)

  try {
    // Fetch the username
    let username
    const mintPurchase = await db.mintPurchase.findUnique({
      where: { orderId },
      include: { member: true },
    })
    const depositOrder = await db.depositOrder.findUnique({
      where: { orderId },
      include: { member: true },
    })
    if (mintPurchase) {
      username = mintPurchase.member.username
    } else {
      username = depositOrder.member.username
    }
    Sentry.setUser({ username })

    if (stripeSignature) {
      // Stripe order
      await processStripeWebhook({ body, stripeSignature })
      return logger.debug({ custom: body }, 'processOrder')
    } else {
      await processWyreWebhook({
        reservation,
        orderId,
        mintPurchase,
        depositOrder,
      })
    }
  } catch (e) {
    await sendDiscordAdminAlert({
      embed: {
        color: 16740982,
        title: `⛈️ Failed to process webhook!`,
        description: `orderId: ${orderId}

  ${JSON.stringify(e)}`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processOrder() ${e}`)
    Sentry.captureException(e)
  }
}
