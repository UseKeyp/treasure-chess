import Sentry from 'src/lib/sentry'

import { processWyreWebhook } from 'src/lib/wyre'
import { processStripeWebhook } from 'src/lib/stripe'
import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import { logger } from 'src/lib/logger'

export const processOrder = async ({ body, stripeSignature }) => {
  try {
    if (stripeSignature) {
      // Stripe order
      await processStripeWebhook({ body, stripeSignature })
    } else {
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
