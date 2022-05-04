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
