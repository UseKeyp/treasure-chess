import Sentry from 'src/lib/sentry'

const chromium = require('chrome-aws-lambda')
const playwright = require('playwright-core')

// import { logger } from 'src/lib/logger'

export const handler = async (event, _context) => {
  // logger.debug('Invoked /screenshot')
  let browser = null
  try {
    const html = event.body
    // logger.debug(html.substring(0, 100))
    if (!html) throw 'No html provided'
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: true,
    })
    const context = await browser.newContext({
      deviceScaleFactor: 2,
      timeout: 30000, // 60 s
    })
    const page = await context.newPage()
    await page.setContent(html)
    const buffer = await page.locator('body > div').screenshot()
    await browser.close()
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
      body: buffer,
    }
  } catch (error) {
    /* eslint-disable no-console */
    // logger.error(error, { custom: event })
    /* eslint-enable no-console */
    Sentry.captureException(error)
    if (browser) await browser.close()
    return {
      statusCode: 500,
      body: {
        message: `Internal server error. ${error}`,
      },
    }
  }
}
