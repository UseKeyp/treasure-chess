import FormData from 'form-data'
import fetch from 'cross-fetch'
import { logger } from 'src/lib/logger'
import { isProduction } from 'src/lib/helpers'

import { getCardHtml } from '@treasure-chess/treasure-html'
import { getAchievementNamesFromValues } from '@treasure-chess/treasure-filters'

import { getDescription, getAttributes } from 'src/lib/pinata/helpers'
import { getGifBase64 } from 'src/lib/chessCom/gifGetter'
// import placeholderImage from './logo'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.APP_DOMAIN

const API_DOMAIN = isProduction
  ? 'http://treasure-chess-api:8080'
  : `${process.env.APP_DOMAIN}/api`

const fetchScreenshotBase64Buffer = async (url) => {
  const target = `${API_DOMAIN}/screenshot?url=${url}`
  const result = await fetch(target)
  if (result.status !== 200) throw "Couldn't get card snapshot"
  const buffer = await result.buffer()
  return buffer
  // return Buffer.from(placeholderImage, 'base64')
}
const fetchBoardBase64Buffer = async ({ boardLayout, playerColor }) => {
  const result = await fetch(`${API_DOMAIN}/image`, {
    method: 'POST',
    body: JSON.stringify({ boardLayout, playerColor }),
  })
  if (result.status !== 200) throw "Couldn't get static board image"
  const buffer = await result.buffer()
  return buffer.toString('base64')
}

const pinFile = async (blob, filename) => {
  try {
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
  } catch (e) {
    throw `pinFile() ${e}`
  }
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

    const boardBuffer = await fetchBoardBase64Buffer({
      boardLayout: JSON.parse(treasure.boardLayout),
      playerColor: treasure.winner,
    })

    const htmlString = await getCardHtml({
      treasure: { ...treasure, achievements: achievementNames },
      gifBase64,
      staticBase64: boardBuffer,
    })
    /* eslint-disable camelcase */
    const animation_url = await pinFile(htmlString, `${treasure.id}.html`)

    const screenshotUrl = escape(
      'https://chess.mypinata.cloud/ipfs/' +
        animation_url.split('ipfs://')[1] +
        '?static=true'
    )
    const screenshotBuffer = await fetchScreenshotBase64Buffer(screenshotUrl)

    const image = await pinFile(screenshotBuffer, `${treasure.id}.png`)
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
    /* eslint-disable no-console */
    logger.info({
      custom: {
        animation_url:
          'https://chess.mypinata.cloud/ipfs/' +
          animation_url.split('ipfs://')[1] +
          '?static=true',
        image: 'https://chess.mypinata.cloud/ipfs/' + image.split('ipfs://')[1],
        tokenUri:
          'https://chess.mypinata.cloud/ipfs/' + tokenUri.split('ipfs://')[1],
      },
    })
    /* eslint-enable no-console */

    return { tokenUri, uriData: stringifiedUriData }
  } catch (e) {
    throw `pinTreasure() ${e}`
  }
}
