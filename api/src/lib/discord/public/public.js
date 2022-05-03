import DiscordBot from 'src/lib/discord/discord'
import commands from './commands'

/* eslint-disable-next-line no-unused-vars*/
const bot = new DiscordBot({
  clientId: process.env.DISCORD_PUBLIC_CLIENT_ID,
  token: process.env.DISCORD_PUBLIC_BOT_TOKEN,
  commands,
})
