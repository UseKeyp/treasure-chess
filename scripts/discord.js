// Run with this command: $(node tasks/environment/setupEnv) yarn rw exec --prisma=false discord

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
import adminCommands from '../api/src/lib/discord/admin/commands'
import publicCommands from '../api/src/lib/discord/public/commands'

const dotenv = require('dotenv')
dotenv.config()

const BOT = 'ADMIN'
// const BOT= "PUBLIC"

const GUILD_ID = '874700997220515901'

let token = process.env.DISCORD_ADMIN_BOT_TOKEN
let clientId = process.env.DISCORD_ADMIN_CLIENT_ID
let commands = adminCommands

if (BOT === 'PUBLIC') {
  token = process.env.DISCORD_PUBLIC_BOT_TOKEN
  clientId = process.env.DISCORD_PUBLIC_CLIENT_ID
  commands = publicCommands
}

const registerCommands = async () => {
  try {
    console.log(`Commands registered: ${commands.map((cmd) => cmd.data.name)}`)
    const rest = new REST({ version: '9' }).setToken(token)

    // Global commands takes up to 1 hour to propagate
    await rest.put(Routes.applicationCommands(clientId), {
      body: commands.map((cmd) => cmd.data),
    })

    // Guild-specific commands update instantly
    await rest.put(Routes.applicationGuildCommands(clientId, GUILD_ID), {
      body: commands.map((cmd) => cmd.data),
    })
  } catch (e) {
    console.error(e)
  }
}

export default registerCommands
