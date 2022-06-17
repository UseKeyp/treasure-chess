import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'
import { processStripeWebhook } from 'src/lib/stripe'
import { processWertWebhook } from 'src/lib/wert'
import { processWyreWebhook } from 'src/lib/wyre'

export const processOrder = async ({ body, stripeSignature }) => {
  try {
    if (stripeSignature) {
      // Stripe order
      await processStripeWebhook({ body, stripeSignature })
    } else {
      logger.debug({ custom: body })
      const { order } = body
      if (order) return processWertWebhook({ body })
      await processWyreWebhook({ body })
    }
  } catch (e) {
    await sendDiscordAdminAlert({
      embed: {
        color: 16740982,
        title: `⛈️ Failed to process ${
          stripeSignature ? 'Stripe' : 'Wyre'
        } webhook!`,
        description: `${JSON.stringify(e)}`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processOrder() ${e}`)
    Sentry.captureException(e)
  }
}
