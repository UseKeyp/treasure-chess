import FormData from 'form-data'
import fetch from 'cross-fetch'
import { logger } from 'src/lib/logger'
import { isProduction } from 'src/lib/helpers'

import { getCardHtml } from '@treasure-chess/treasure-html'
import { getAchievementNamesFromValues } from '@treasure-chess/treasure-filters'

import { getDescription, getAttributes } from 'src/lib/pinata/helpers'
import { getGifBase64 } from 'src/lib/chessCom/gifGetter'
import placeholderImage from './logo'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.APP_DOMAIN

const API_DOMAIN = isProduction
  ? 'http://treasure-chess-api:8080'
  : process.env.REDWOOD_API_URL

const fetchScreenshotBase64Buffer = async (html) => {
  try {
    if (['dev', 'sandbox'].includes(process.env.ENVIRONMENT))
      return Buffer.from(placeholderImage, 'base64')
    const result = await fetch(`${API_DOMAIN}/screenshot`, {
      method: 'POST',
      body: html,
      'Content-Type': 'text/plain',
    })
    // logger.debug({ custom: result }, 'fetchScreenshotBase64Buffer result ')
    // if (result.status !== 200) throw "Couldn't get card snapshot"
    const buffer = await result.buffer()
    logger.debug(`typeof buffer ${typeof buffer}`)
    logger.debug(`buffer.length ${buffer.length}`)
    return buffer
  } catch (e) {
    logger.error(e)
    throw `fetchScreenshotBase64Buffer() ${e}`
  }
}

const fetchBoardBase64Buffer = async ({ boardLayout, playerColor }) => {
  try {
    // logger.debug({ custom: boardLayout }, 'fetchBoardBase64Buffer')
    const result = await fetch(`${API_DOMAIN}/image`, {
      method: 'POST',
      body: JSON.stringify({ boardLayout, playerColor }),
    })
    if (result.status !== 200) throw "Couldn't get static board image"
    const buffer = await result.buffer()
    return buffer.toString('base64')
  } catch (e) {
    logger.error(e)
    logger.debug(JSON.stringify({ boardLayout, playerColor }))
    throw `fetchBoardBase64Buffer() ${e}`
  }
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
    logger.error(e)
    throw `pinFile() ${e}`
  }
}

const pinJson = async (jsonString) => {
  try {
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
  } catch (e) {
    logger.error(e)
    throw `pinJson() ${e}`
  }
}

const ipfsUrlToPinata = (ipfsUrl) =>
  'https://chess.mypinata.cloud/ipfs/' + ipfsUrl.split('ipfs://')[1]

export const pinTreasure = async ({ treasure, tcn }) => {
  try {
    // Setup
    const { gifBase64 } = await getGifBase64({
      tcn,
      playerColor: treasure.cardColor,
    })
    const achievementNames = getAchievementNamesFromValues(
      treasure.achievements
    )
    const attributes = getAttributes({ ...treasure, achievementNames })

    // Image processing
    const boardBuffer = await fetchBoardBase64Buffer({
      boardLayout: JSON.parse(treasure.boardLayout),
      playerColor: treasure.winner,
    })

    const htmlStringScreenshot = await getCardHtml({
      treasure: { ...treasure, achievements: achievementNames },
      staticBase64: boardBuffer,
      isScreenshot: true,
    })
    const screenshotBuffer = await fetchScreenshotBase64Buffer(
      htmlStringScreenshot
    )
    const image = await pinFile(screenshotBuffer, `${treasure.id}.png`)

    const htmlStringPrerender = await getCardHtml({
      treasure: { ...treasure, achievements: achievementNames },
      staticBase64: boardBuffer,
      isPrerender: true,
    })
    const prerenderImageBuffer = await fetchScreenshotBase64Buffer(
      htmlStringPrerender
    )
    const openGraphImageSrc = await pinFile(
      prerenderImageBuffer,
      `${treasure.id}-prerender.png`
    )

    const htmlString = await getCardHtml({
      treasure: { ...treasure, achievements: achievementNames },
      gifBase64,
      staticBase64: boardBuffer,
      openGraphImageSrc: ipfsUrlToPinata(openGraphImageSrc),
    })

    /* eslint-disable camelcase */
    const animation_url = await pinFile(htmlString, `${treasure.id}.html`)

    const uriData = {
      description: getDescription({ opening: treasure.opening }), // TODO: Update copy for this
      external_url: `${TOKEN_URI_DOMAIN}/treasures`,
      name: treasure.title,
      attributes,
      animation_url,
      image,
    }
    const stringifiedUriData = JSON.stringify(uriData)
    logger.debug({ custom: uriData }, 'uriData')
    const tokenUri = await pinJson(stringifiedUriData)

    let customLog = ''
    try {
      ;[tokenUri, animation_url, image, openGraphImageSrc].map((ipfs) => {
        try {
          customLog += `${ipfsUrlToPinata(ipfs)}, `
        } catch (e) {
          throw ipfs
        }
      })
    } catch (e) {
      throw `error getting ipfs url: ${e}`
    }
    logger.info(customLog)

    return { tokenUri, uriData: stringifiedUriData }
  } catch (e) {
    throw `pinTreasure() ${e}`
  }
}
