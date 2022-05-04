// NOTE: This file is currently not included in the app. It must be included for this bot to run..

import { logger } from 'src/lib/logger'
import DiscordBot from 'src/lib/discord/discord'

import commands from './commands'

const BOTS = {
  dev: {
    clientId: process.env.DISCORD_PUBLIC_CLIENT_ID_DEV,
    botToken: process.env.DISCORD_PUBLIC_BOT_TOKEN_DEV,
  },
  staging: {
    clientId: process.env.DISCORD_PUBLIC_CLIENT_ID_STAGING,
    botToken: process.env.DISCORD_PUBLIC_BOT_TOKEN_STAGING,
  },
  prod: {
    clientId: process.env.DISCORD_PUBLIC_CLIENT_ID_PROD,
    botToken: process.env.DISCORD_PUBLIC_BOT_TOKEN_PROD,
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
  'Bot details for "treasure-chess"'
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
