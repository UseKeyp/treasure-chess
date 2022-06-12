import fetch from 'node-fetch'
import { logger } from 'src/lib/logger'

const MAUTIC_API_BASE = 'https://mautic.tools.treaurechess.com'
const MAUTIC_API = `${MAUTIC_API_BASE}/api`

export const getToken = async () => {
  return fetch(`${MAUTIC_API_BASE}/oauth/v2/token`, {
    method: 'POST',
    body: JSON.stringify({
      client_id: process.env.MAUTIC_CLIENT_ID,
      client_secret: process.env.MAUTIC_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  }).then(async (res) => {
    logger.debug({ custom: res }, 'getToken')
    const obj = await res.json()
    if (res.status === 204) return `No content returned by Wyre - ${url}`
    const data = await res.json()
    if (data.errors || !data.access_token) {
      throw `getToken() error no token. ${JSON.strinify(data.errors)}`
    }
    return data.access_token
  })
}

export const createContact = async ({ member }) => {
  return fetch(`${MAUTIC_API}/contacts/new`, {
    method: 'POST',
    body: JSON.stringify({
      username: member.username,
      email: member.email,
      chess_id: member.id,
    }),
  }).then(async (res) => {
    logger.debug({ custom: res }, 'createContact')
    const obj = await res.json()
    if (res.status === 204) return `No content returned by Wyre - ${url}`
    const data = await res.json()
    if (data.errors || !data.access_token) {
      throw `getToken() error no token. ${JSON.strinify(data.errors)}`
    }
    return data.access_token
  })
}
