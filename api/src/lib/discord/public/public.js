// NOTE: This file is currently not included in the app. It must be included for this bot to run..

import { logger } from 'src/lib/logger'
import DiscordBot from 'src/lib/discord/discord'
import { botToken, clientId } from 'src/lib/discord/public/config'
import commands from 'src/lib/discord/public/commands'

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
  process.env.ENABLE_DISCORD_BOTS === 'true' && // Prevents multiple instances running
  clientId &&
  botToken
)
  /* eslint-disable-next-line no-new */
  new DiscordBot({
    clientId,
    botToken,
    commands,
  })
