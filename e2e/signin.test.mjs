import { expect, test } from '@playwright/test'

// --

test('loads the "signin" page', async ({ page }) => {
  //
  await page.goto('/signin')
  await page.waitForURL('/signin')

  expect(page.url()).toBe('http://localhost:8910/signin')
})

test('navigates to "chess.com" after clicking "sign in"', async ({ page }) => {
  //
  await page.goto('/signin')

  await page.locator('button:has-text("Sign in with Chess.com")').click()
  await page.waitForURL('https://www.chess.com/register')

  expect(page.url()).toBe('https://www.chess.com/register')
})
