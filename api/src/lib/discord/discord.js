import fetch from 'node-fetch'
import Sentry from 'src/lib/sentry'

const DISCORD_API_URL = 'https://discord.com/api/v9'

const CHANNELS_DEV = {
  orders: '900524323238981703',
  airdrop: '936402300954640394',
}
const CHANNELS_STAGING = {
  orders: '936403586290683974',
  airdrop: '936403830105587823',
}
const CHANNELS_PROD = {
  orders: '900529491829460992',
  airdrop: '936402336899801088',
}

const getChannelId = (channel) => {
  let id = CHANNELS_DEV[channel]
  // Sandbox shares with dev
  if (process.env.ENVIRONMENT === 'staging') id = CHANNELS_STAGING[channel]
  if (process.env.ENVIRONMENT === 'prod') id = CHANNELS_PROD[channel]
  return id
}

export const sendDiscordAlert = async ({ message, embed, channelName }) => {
  try {
    const channelId = getChannelId(channelName)
    await fetch(`${DISCORD_API_URL}/channels/${channelId}/messages`, {
      method: 'POST',
      body: message ? message : JSON.stringify({ embed }),
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.text())
  } catch (e) {
    Sentry.captureException(e)
  }
}
