import FormData from 'form-data'
import fetch from 'node-fetch'

import { getDescription } from 'src/lib/pinata/helpers'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.TOKEN_URI_DOMAIN

const pinFile = async (blob, filename) => {
  if (!filename) throw 'No filename provided'
  let form = new FormData()
  form.append('file', blob, { filepath: filename })
  form.append('pinataMetadata', JSON.stringify({ name: filename }))
  const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
    method: 'post',
    body: form,
    maxContentLength: -1,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET_KEY,
    },
  }).then((res) => {
    return res.json()
  })
  if (!response.IpfsHash) throw `Couldn't pin file: ${blob}`
  return `ipfs://${response.IpfsHash}`
}

const pinJson = async (jsonString) => {
  const response = await fetch(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, {
    method: 'post',
    body: jsonString,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET_KEY,
    },
  }).then((res) => {
    return res.json()
  })

  if (!response.IpfsHash) throw `Couldn't pin JSON: ${jsonString}`
  return `ipfs://${response.IpfsHash}`
}

export const pinTreasure = async ({ treasure }) => {
  try {
    // Generate the HTML
    const htmlString = '<head></head><body></body>'
    // Upload the HTML
    /* eslint-disable-next-line camelcase */
    const animation_url = await pinFile(htmlString, `${treasure.id}.html`)

    // Generate snapshot of card  @ final position
    const imageSnapshotData = 'dsfgdfgdfgdfg'
    // Upload the snapshot of the whole card
    // TODO: ensure file extension is correct
    const image = await pinFile(imageSnapshotData, `${treasure.id}.png`)

    // Upload the JSON blob
    const [achieve1, achieve2, achieve3] = treasure.achievements.split(',')
    const attributes = [{ trait_type: 'Rarity', value: treasure.rarity }]
    if (achieve1)
      attributes.push({
        trait_type: 'Achievement 1',
        value: achieve1,
      })
    if (achieve2)
      attributes.push({
        trait_type: 'Achievement 2',
        value: achieve2,
      })
    if (achieve3)
      attributes.push({
        trait_type: 'Achievement 3',
        value: achieve3,
      })

    attributes.push(
      { trait_type: 'White Player', value: treasure.whiteUsername },
      { trait_type: 'Black Player', value: treasure.blackUsername },
      { trait_type: 'Winner', value: treasure.outcome },
      { trait_type: 'Opening', value: treasure.opening },
      { trait_type: 'Rule Variant', value: treasure.ruleVariant },
      { trait_type: 'Time Control', value: treasure.timeControl }
    )
    const uriData = {
      description: getDescription({ opening: treasure.opening }), // TODO: Update copy for this
      external_url: `${TOKEN_URI_DOMAIN}/treasures`,
      name: treasure.title,
      attributes,
      animation_url,
      image,
    }
    const stringifiedUriData = JSON.stringify(uriData)
    const tokenUri = await pinJson(stringifiedUriData)
    return { tokenUri, uriData: stringifiedUriData }
  } catch (e) {
    throw `pinTreasure() ${e}`
  }
}
