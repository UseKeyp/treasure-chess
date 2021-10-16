import fetch from 'node-fetch'
import { isProduction } from 'src/lib/helpers'

const API_ENDPOINT = 'https://discord.com/api/v9'
// Post to different channels depending on environment
const CHANNEL_ID = isProduction ? '12345' : '54321'

export const sendDiscordAlert = async ({ message, embed }) => {
  await fetch(`${API_ENDPOINT}/channels/${CHANNEL_ID}/messages`, {
    method: 'POST',
    body: message ? message : JSON.stringify({ embed }),
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.text())
}
