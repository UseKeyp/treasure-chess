const playwright = require('playwright-core')
const chromium = require('chrome-aws-lambda')

import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

export const handler = async (event, _context) => {
  logger.info('Invoked screenshot function')
  let browser = null
  try {
    const { url } = event.queryStringParameters
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
    const context = await browser.newContext()

    const page = await context.newPage()
    await page.goto(url, {
      waitUntil: 'networkidle',
    })
    const buffer = await page.screenshot()
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: buffer,
    }
  } catch (error) {
    console.log(error)
    console.log(event)
    Sentry.captureException(error)
    return {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
