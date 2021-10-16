import fetch from 'node-fetch'

const API_ENDPOINT = 'https://discord.com/api/v9'
const CHANNEL_ID = '12345'

export const sendDiscordAlert = async ({ message, embed }) => {
  await fetch(`${API_ENDPOINT}/channels/${channelId}/messages`, {
    method: 'POST',
    body: message ? message : JSON.stringify({ embed }),
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.text())
}
