import fetch from 'node-fetch'
import { logger } from 'src/lib/logger'
import { encodeBody } from 'src/lib/oAuth/helpers'

const MAUTIC_API_BASE = 'https://mautic.tools.treasurechess.com'
const MAUTIC_API = `${MAUTIC_API_BASE}/api`

const getMauticToken = async () => {
  const body = {
    client_id: process.env.MAUTIC_CLIENT_ID,
    client_secret: process.env.MAUTIC_CLIENT_SECRET,
    grant_type: 'client_credentials',
  }
  return fetch(`${MAUTIC_API_BASE}/oauth/v2/token`, {
    method: 'POST',
    body: encodeBody(body),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).then(async (res) => {
    logger.debug({ custom: res }, 'getMauticToken()')
    if (res.status === 204) throw `No content returned by Mautic`
    const data = await res.json()
    if (data.errors || !data.access_token) {
      throw `getMauticToken() error no token. ${JSON.stringify(data.errors)}`
    }
    return data.access_token
  })
}

const fetchMautic = async ({ body, method, path }) => {
  const authToken = await getMauticToken()
  return fetch(`${MAUTIC_API}${path}`, {
    method,
    ...(body && { body: encodeBody(body) }),
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(async (res) => {
    logger.debug({ custom: res }, `fetchMautic() ${path}`)
    if (res.status === 204) throw `No content returned by Mautic`
    const data = await res.json()
    if (data.errors) {
      throw `fetchMautic() ${path} error ${JSON.stringify(data.errors)}`
    }
    return data
  })
}

export const createMauticContact = async ({ member }) => {
  try {
    await fetchMautic({
      body: {
        username: member.username,
        email: member.email,
        chess_id: member.id,
      },
      method: 'POST',
      path: '/contacts/new',
    })
  } catch (e) {
    logger.error(e)
  }
}

export const updateMauticContact = async ({ member, data }) => {
  try {
    const contacts = await fetchMautic({
      path: `/contacts?where[0][col]=username&where[0][expr]=in&where[0][val]=${member.username}`,
    })
    if (contacts.total === 0) throw `No contact found for ${member.username}`
    const contact = contacts.contacts[0]
    await fetchMautic({
      body: data,
      method: 'PATCH',
      path: `/contacts/${contact.id}/edit`,
    })
  } catch (e) {
    logger.error(e)
  }
}
export const fetchContact = async ({ member }) => {
  const data = await fetchMautic({
    path: `/contacts?where[0][col]=username&where[0][expr]=in&where[0][val]=${member.username}`,
  })
  if (data.total === 0) throw `No contact found for ${member.username}`
  const contact = data.contacts[Object.keys(data.contacts)[0]]
  return contact
}

export const updateMauticContactMinted = async ({ member, purchase }) => {
  try {
    const contact = await fetchContact({ member })
    const treasuresMinted = contact?.fields?.core?.treasures_minted?.value
    await fetchMautic({
      body: { treasures_minted: treasuresMinted + 1 },
      method: 'PATCH',
      path: `/contacts/${contact.id}/edit`,
    })
    if (treasuresMinted === 0)
      await sendEmail({
        emailId: 15, // First mint email
        contact,
        tokens: {
          '{transaction_title}':
            'Congratulations on minting your first Treasure!',
          '{transaction_description}':
            'Each Treasure has a level: Good, Great, Ultra, or Mythic. The level is calculated automatically based on the achievements earned. Do something amazing, like take all of your opponents pawns without losing any, and you will be on your way to a Mythic Treasure.',
          '{row_1_title}': 'Treasure',
          '{row_2_title}': 'Level',
          '{row_3_title}': 'Total Amount',
          '{row_1_text}': `#${purchase.treasure.tokenId}`,
          '{row_2_text}': `${purchase.treasure.rarity}`,
          '{row_3_text}': '$5',
        },
      })
  } catch (e) {
    logger.error(e)
  }
}

export const sendEmail = async ({ emailId, tokens, contact }) => {
  const authToken = await getMauticToken()
  return fetch(`${MAUTIC_API}/emails/${emailId}/contact/${contact.id}/send`, {
    method: 'POST',
    body: JSON.stringify({ tokens }),
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    logger.debug({ custom: res }, `sendEmail()`)
    if (res.status === 204) throw `No content returned by Mautic`
    const data = await res.json()
    if (data.errors) {
      throw `sendEmail() error ${JSON.stringify(data.errors)}`
    }
    return data
  })
}
