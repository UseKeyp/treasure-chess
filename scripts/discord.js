// Run with this command: $(node tasks/environment/setupEnv) yarn rw exec --prisma=false discord

const { Routes } = require('discord-api-types/v9')
import adminCommands from '../api/src/lib/discord/admin/commands'
import {
  botToken as adminBotToken,
  clientId as adminClientId,
} from '../api/src/lib/discord/admin'

import publicCommands from '../api/src/lib/discord/public/commands'
import {
  botToken as publicBotToken,
  clientId as publicClientId,
} from '../api/src/lib/discord/public'

import { fetchDiscord } from '../api/src/lib/discord/discord'

const dotenv = require('dotenv')
dotenv.config()

const BOT = 'ADMIN'
// const BOT= "PUBLIC"

const GUILD_ID = '874700997220515901' // Our internal treasure-chess server

const method = 'PUT'
// Use DELETE to remove old unwanted command. Unnecessary for updates to existing commands.
// See https://discord.com/developers/docs/interactions/application-commands#updating-and-deleting-a-command
// const method = "DELETE"

let botName = 'chester'
let botToken = adminBotToken
let clientId = adminClientId
let commands = adminCommands

if (BOT === 'PUBLIC') {
  botName = 'treasure-chess'
  botToken = publicBotToken
  let clientId = publicClientId
  commands = publicCommands
}

const registerCommands = async () => {
  try {
    console.log(
      `Registering commands for bot "${botName}" - ${commands.map(
        (cmd) => cmd.data.name
      )}`
    )
    const body = commands.map((cmd) => cmd.data)

    await Promise.all(
      [
        // Global commands takes up to 1 hour to propagate
        Routes.applicationCommands(clientId),
        // Guild-specific commands update instantly
        Routes.applicationGuildCommands(clientId, GUILD_ID),
      ].map(async (path) => {
        await fetchDiscord({
          path,
          body,
          method,
          botToken,
        })
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export default registerCommands
