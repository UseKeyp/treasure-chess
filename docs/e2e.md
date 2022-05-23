# End-to-End Testing

End-to-end testing is facilitated by [Playwright](https://playwright.dev/).

## Setup

Install the browser(s) which Playwright will test the application from.

```
npx playwright install
```

## Writing Tests

> See [Playwright's "First Test" guide](https://playwright.dev/docs/intro#first-test) for further instruction.

Tests should be added to the `./e2e` directory, using the `fileName.{spec|test}.{js|mjs|ts|...}` syntax.

These tests are [transpiled by Playwright](https://playwright.dev/docs/test-typescript), **not** RedwoodJS. This means, scripts will need to use CommonJS unless they make use of the `.mjs` extension and TypeScript is supported out-of-the-box.

## Running Tests

Run all tests found in the `./e2e` directory, using the configuration provided at `./playwright.config.js`.

```
yarn rw-test-e2e
```

### Debug Mode

The following will enable a portion of [Playwright's debug tools](https://playwright.dev/docs/debug) and output RedwoodJS server logs to `stdout`.

```
yarn rw-test-e2e:debug
```
