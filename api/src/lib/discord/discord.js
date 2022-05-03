import { Client, Intents } from 'discord.js'
import { logger } from 'src/lib/logger'

const DISCORD_NO_DM_INVOCATION =
  'NOTE: Treasure Chess will never DM you! You can only use the bot in the server.'

class DiscordBot {
  constructor({ clientId, token, commands }) {
    if (!token || !clientId || !commands)
      throw 'Invalid Discord params provided'
    try {
      const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES] })
      client.once('ready', async () => {
        logger.debug(`Discord bot ready! ${clientId}`)
      })

      client.on('message', async (message) => {
        if (message.channel.type == 'dm')
          return message.reply(DISCORD_NO_DM_INVOCATION)
      })

      client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return
        if (interaction.type == 'dm')
          return interaction.reply(DISCORD_NO_DM_INVOCATION)

        const command = commands.find(
          (cmd) => cmd.data.name === interaction.commandName
        )

        if (!command) return

        try {
          // Extend response deadline from 3s to 15m
          await interaction.deferReply({ ephemeral: false })
          await command.execute(interaction)
        } catch (e) {
          logger.debug('Something wend wrong while executing this function')
          logger.error(e)
          await interaction.editReply({
            content: `Error: ${e}`,
            ephemeral: false,
          })
        }
      })

      client.login(token)
    } catch (e) {
      logger.error(e)
      // Maybe we don't want to throw here if there are multiple instances.
    }
  }
}

export default DiscordBot
