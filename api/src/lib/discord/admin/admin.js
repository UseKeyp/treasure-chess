import Sentry from 'src/lib/sentry'

import DiscordBot, { postToChannel } from 'src/lib/discord/discord'
import commands from './commands'

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

/* eslint-disable-next-line no-unused-vars*/
const bot = new DiscordBot({
  clientId: process.env.DISCORD_ADMIN_CLIENT_ID,
  token: process.env.DISCORD_ADMIN_BOT_TOKEN,
  commands,
})

const getChannelId = (channel) => {
  let id = CHANNELS_DEV[channel]
  // Sandbox shares with dev
  if (process.env.ENVIRONMENT === 'staging') id = CHANNELS_STAGING[channel]
  if (process.env.ENVIRONMENT === 'prod') id = CHANNELS_PROD[channel]
  return id
}

export const sendDiscordAdminAlert = async ({
  message,
  embed,
  channelName,
}) => {
  try {
    const channelId = getChannelId(channelName)
    await postToChannel({
      message,
      embed,
      channelId,
      botToken: process.env.DISCORD_ADMIN_BOT_TOKEN,
    })
  } catch (e) {
    Sentry.captureException(e)
  }
}
