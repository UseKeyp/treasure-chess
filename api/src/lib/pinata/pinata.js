import FormData from 'form-data'
import fetch from 'node-fetch'
import fs from 'fs'

import { getCardHtml } from '@treasure-chess/treasure-html'
import { getAchievementNamesFromValues } from '@treasure-chess/treasure-filters'

import { getDescription, getAttributes } from 'src/lib/pinata/helpers'
import { getGifBase64 } from 'src/lib/chessCom/gifGetter'

const { getBoardBase64 } = require('@treasure-chess/chess-image-generator')

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.APP_DOMAIN

const fetchCardScreenshotBase64 = async (url) => {
  const target = `${process.env.APP_DOMAIN}/api/screenshot?url=${url}`

  if (result.status !== 200) throw "Couldn't get card snapshot"
  const result = await fetch(target)
  const buffer = result.body
  console.log(buffer)
  return buffer.toString('base64')
}

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
    const achievementNames = getAchievementNamesFromValues(
      treasure.achievements
    )

    let config = {
      size: 640,
      dark: 'rgb(181, 137, 98)',
      light: 'rgb(241, 216, 180)',
      // TODO: Change to neo
      style: 'alpha',
    }
    const boardBase64 = await getBoardBase64(
      treasure.boardLayout,
      treasure.winner,
      config
    )
    // Generate the HTML
    const htmlString = await getCardHtml({
      treasure: { ...treasure, achievements: achievementNames },
      gifBase64,
      staticBase64: boardBase64,
    })
    // console.log(htmlString)
    // Upload the HTML
    /* eslint-disable camelcase */
    const animation_url = await pinFile(htmlString, `${treasure.id}.html`)

    // TODO: Get the static board image
    // Generate snapshot of card  @ final position
    // Upload the snapshot of the whole card
    const snapshotUrl = escape(
      'https://chess.mypinata.cloud/ipfs/' +
        animation_url.split('ipfs://')[1] +
        '?static=true'
    )
    const snapshotBase64 = await fetchCardScreenshotBase64(snapshotUrl)
    // TODO: remove this!
    fs.writeFile(
      'deleteme-snapshotBase64.png',
      snapshotBase64,
      (e) => e && console.log(e)
    )

    // TODO: ensure file extension is correct
    const image = await pinFile(snapshotBase64, `${treasure.id}.png`)

    const attributes = getAttributes({ ...treasure, achievementNames })

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
