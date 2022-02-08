const playwright = require('playwright-core')
const chromium = require('chrome-aws-lambda')

export const captureCardScreenshot = async (url) => {
  return captureScreenshot(url)
}

export const captureScreenshot = async (
  url = 'https://duckduckgo.com',
  width = 500,
  height = 1000
) => {
  let browser = null
  try {
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
    return buffer
  } catch (error) {
    console.log(error)
    throw `captureScreenshot() ${error}`
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
