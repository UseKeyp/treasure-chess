// import { toPng } from 'html-to-image';
const playwright = require('playwright-core')
const chromium = require('chrome-aws-lambda')

import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.info('Invoked htmlToImage function')
  try {
    const { url } = event.queryStringParameters

    // frame.setContent(html[, options])

    const str = await buffer.toString('base64')
    console.log(str)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: str,
    }
  } catch (error) {
    console.log(error)
    console.log(event)
    Sentry.captureException(error)
    return {
      statusCode: 500,
      body: {
        message: `Internal server error. ${error}`,
      },
    }
  }
}
