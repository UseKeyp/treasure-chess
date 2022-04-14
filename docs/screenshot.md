# Screenshot

Adding `?static=true` to the Treasure Html shows the static board image instead

Replaced canvas with `@napi-rs/canva`

# Troubleshooting

```bash
ps aux | grep playwright
```

## chrome-aws-lambda

Used in conjunction with normal `playwright`

In order to test locally, you must follow this guide: https://github.com/alixaxel/chrome-aws-lambda/wiki/HOWTO:-Local-Development

Q - Needs puppeteer-core dep?

## playwright-aws-lambda

Used

https://github.com/JupiterOne/playwright-aws-lambda

## node-html-to-image

https://github.com/frinyvonnick/node-html-to-image

Note: When you install Puppeteer, it downloads a recent version of Chromium (~170MB Mac, ~282MB Linux, ~280MB Win) that is guaranteed to work with the API.

> NOTE: Maybe this will work as long as chrome-aws lambda is installed? They both rely on Puppeteer?
