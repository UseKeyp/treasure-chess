import { sendDiscordAdminAlert } from 'src/lib/discord/admin'

const WERT_SUCCESS_TYPES = ['order_complete']

export const processWertWebhook = async ({ body }) => {
  const { order, type } = body
  // Sentry.setUser({ username })
  try {
    if (order && WERT_SUCCESS_TYPES.includes(type)) {
      const member = fetchMember(order.address)
      await sendDiscordAdminAlert({
        embed: {
          color: 3066993, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          title: `🤑 Deposit Success!`,
          description: `Wyre order ID: ${order.id}
      sourceCurrency: ${order.base}
  usdSourceAmount: **$${order.base_amount}**
  usdPurchaseAmount: **$${order.quote_amount}**
  dest: ${order.address}
  fees: ${
    order.base === 'USD'
      ? `$${Number(order.base_amount) - Number(order.quote_amount)}`
      : 'cannot calculate'
  }
  user: https://treasure.chess.com/members/${depositOrder?.member?.username}

  ${JSON.stringify(body, undefined, 4)}`,
          footer: { text: new Date().toString() },
          // type: 'link',
        },
        channelName: 'orders',
      })
    }
  } catch (e) {
    await sendDiscordAdminAlert({
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
