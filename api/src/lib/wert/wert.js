import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import Sentry from 'src/lib/sentry'
import { logger } from 'src/lib/logger'
import { fetchMember } from 'src/lib/members'

const WERT_SUCCESS_TYPES = ['order_complete']

export const processWertWebhook = async ({ body }) => {
  const { order, type } = body
  try {
    if (order && WERT_SUCCESS_TYPES.includes(type)) {
      const member = await fetchMember(order.address)
      member && Sentry.setUser({ username: member.username })
      await sendDiscordAdminAlert({
        embed: {
          color: 3066993, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          title: `🤑 Deposit Success!`,
          thumbnail: {
            url: 'https://downloads.intercomcdn.com/i/o/262935/cb9284742c20c5918fe4cbf9/33321e2f6c339fd641a65e201f450cf5.png',
          },
          image: null,
          description: `Provider: Wert
  base_amount: **${order.base_amount} ${order.base}**
  quote_amount: **$${order.quote_amount} MUSDC**
  address: ${order.address}
  fees: ${
    order.base === 'USD'
      ? `$${Number(order.base_amount) - Number(order.quote_amount)}`
      : 'cannot calculate'
  }
  ${
    member ? `user: https://treasure.chess.com/members/${member?.username}` : ''
  }

  ${JSON.stringify(body, undefined, 4)}`,
          footer: { text: new Date().toString() },
          type: 'link',
        },
        channelName: 'orders',
      })
    }
  } catch (e) {
    await sendDiscordAdminAlert({
      embed: {
        color: 2067276,
        title: `❓🤑 Deposit processing error`,
        thumbnail: {
          url: 'https://partner-sandbox.wert.io/icons/favicon-32x32.ico',
        },
        description: `See below to confirm if successful.

${e}
${JSON.stringify(order, undefined, 4)}`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processDepositOrder() ${e}`)
    Sentry.captureException(e)
  }
}
