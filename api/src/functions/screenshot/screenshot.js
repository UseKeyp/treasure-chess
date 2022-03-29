const playwright = require('playwright-core')
const chromium = require('chrome-aws-lambda')

import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.debug('Invoked /screenshot')
  let browser = null
  try {
    const { url } = event.queryStringParameters
    if (!url.match(/https:\/\/chess.mypinata.cloud\/ipfs/))
      throw 'Only chess.mypinata.cloud is allowed'
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
    const context = await browser.newContext({
      deviceScaleFactor: 2,
      timeout: 60000, // 60 s
    })

    const page = await context.newPage()
    await page.goto(url)
    const buffer = await page.locator('body > div').screenshot()
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: buffer,
    }
  } catch (error) {
    /* eslint-disable no-console */
    logger.error(error, { custom: event })
    /* eslint-enable no-console */
    Sentry.captureException(error)
    return {
      statusCode: 500,
      body: {
        message: `Internal server error. ${error}`,
      },
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
