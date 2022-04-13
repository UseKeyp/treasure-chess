import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import fetch from 'cross-fetch'

import Sentry from 'src/lib/sentry'

const ipfsUrlToPinata = (ipfsUrl) =>
  'https://chess.mypinata.cloud/ipfs/' + ipfsUrl.split('ipfs://')[1]

export const handler = async (event, _context) => {
  logger.debug('Invoked /prerender')
  try {
    const { tokenId } = event.queryStringParameters

    const treasure = await db.treasure.findUnique({
      where: { tokenId: Number(tokenId) },
    })
    if (!treasure) return { statusCode: 404 }

    const { uriData } = treasure
    /* eslint-disable camelcase */
    const { animation_url } = JSON.parse(uriData)
    const url = ipfsUrlToPinata(animation_url)
    logger.debug(url)
    const html = await fetch(url)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html.body,
    }
  } catch (error) {
    /* eslint-disable no-console */
    logger.error(error, { custom: event })
    /* eslint-enable no-console */
    Sentry.captureException(error)
    return {
      statusCode: 500,
      body: { message: `Internal server error. ${error}` },
    }
  }
}
