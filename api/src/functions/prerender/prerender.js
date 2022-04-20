import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { getCardHtml } from '@treasure-chess/treasure-html'

import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.debug('Invoked /prerender')
  try {
    const { tokenId } = event.queryStringParameters

    const treasure = await db.treasure.findUnique({
      where: { tokenId: Number(tokenId) },
      include: { white: true, black: true },
    })
    if (!treasure) return { statusCode: 404 }

    let openGraphImageSrc = 'https://treasure.chess.com/seo.png'
    if (treasure.openGraphImageSrc)
      openGraphImageSrc = treasure.openGraphImageSrc

    const htmlString = await getCardHtml({
      treasure,
      openGraphImageSrc,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: htmlString,
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
