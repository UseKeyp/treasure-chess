import FormData from 'form-data'
import fetch from 'node-fetch'

import { getCardHtml } from '@treasure-chess/treasure-html'

import { getDescription, getAttributes } from 'src/lib/pinata/helpers'
import { getGifBase64 } from 'src/lib/chessCom/gifGetter'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.APP_DOMAIN

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

export const pinTreasure = async ({ treasure, tcn }) => {
  try {
    const { gifBase64 } = await getGifBase64({
      tcn,
      playerColor: treasure.cardColor,
    })
    // Generate the HTML
    const htmlString = await getCardHtml({ treasure, gifBase64 })
    // const htmlString = 'await getCardHtml({ treasure, gifData })'

    // Upload the HTML
    /* eslint-disable camelcase */
    const animation_url = await pinFile(htmlString, `${treasure.id}.html`)

    // Generate snapshot of card  @ final position
    // Upload the snapshot of the whole card
    const imageSnapshotData =
      'ipfs://QmW98R2H88EQMXcp3fECDWkxxtLn6YFJYePKbctQb5oe2B'

    // TODO: ensure file extension is correct
    const image = await pinFile(imageSnapshotData, `${treasure.id}.png`)

    const attributes = getAttributes(treasure)

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
