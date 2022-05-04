import Sentry from 'src/lib/sentry'
import { logger } from 'src/lib/logger'
import DiscordBot, { postToChannel } from 'src/lib/discord/discord'

import commands from './commands'

const BOTS = {
  dev: {
    clientId: process.env.DISCORD_ADMIN_CLIENT_ID_DEV,
    botToken: process.env.DISCORD_ADMIN_BOT_TOKEN_DEV,
  },
  staging: {
    clientId: process.env.DISCORD_ADMIN_CLIENT_ID_STAGING,
    botToken: process.env.DISCORD_ADMIN_BOT_TOKEN_STAGING,
  },
  prod: {
    clientId: process.env.DISCORD_ADMIN_CLIENT_ID_PROD,
    botToken: process.env.DISCORD_ADMIN_BOT_TOKEN_PROD,
  },
}
let environment = process.env.ENVIRONMENT
if (environment === 'local') environment = 'dev'
export const { clientId, botToken } = BOTS[environment]
logger.debug(
  {
    custom: {
      clientId,
      botToken,
      'process.env.ENABLE_DISCORD_BOTS': process.env.ENABLE_DISCORD_BOTS,
    },
  },
  'Bot details for "chester"'
)

if (
  process.env.ENABLE_DISCORD_BOTS && // Prevents multiple instances running
  clientId &&
  botToken
)
  /* eslint-disable-next-line no-new */
  new DiscordBot({
    clientId,
    botToken,
    commands,
  })

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
      botToken,
    })
  } catch (e) {
    Sentry.captureException(e)
  }
}
