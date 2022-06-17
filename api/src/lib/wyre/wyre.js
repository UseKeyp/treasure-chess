const CryptoJS = require('crypto-js')
import fetch from 'node-fetch'

import Sentry from 'src/lib/sentry'
import { db } from 'src/lib/db'
import { sendDiscordAdminAlert } from 'src/lib/discord/admin'
import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'
import { processMintPurchaseOrder } from 'src/lib/mintPurchases'

const DISCORD_WYRE_DASHBOARD_URL = isProduction
  ? 'https://www.sendwyre.com/#/dashboard'
  : 'https://www.testwyre.com/#/dashboard'

const WYRE_SECRET_KEY = process.env.WYRE_SECRET_KEY
const WYRE_API_KEY = process.env.WYRE_API_KEY
const API_URL = isProduction
  ? 'https://api.sendwyre.com/v3'
  : 'https://api.testwyre.com/v3'
const API_URL_V2 = isProduction
  ? 'https://api.sendwyre.com/v2'
  : 'https://api.testwyre.com/v2'
const WYRE_WEBHOOK_URL = process.env.APP_DOMAIN + '/api/wyre'

const WYRE_REDIRECT_URI = `${process.env.APP_DOMAIN}/redirect/wyre`
const WYRE_REDIRECT_URI_ERROR = `${process.env.APP_DOMAIN}/redirect/wyre?error=true`

const WYRE_TOKEN_SYMBOL = 'MUSDC'

const signature = (url, data) => {
  let dataToBeSigned = url
  if (data) dataToBeSigned = url + data
  const token = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(
      dataToBeSigned.toString(CryptoJS.enc.Utf8),
      WYRE_SECRET_KEY
    )
  )
  return token
}

export const getReferenceId = ({ username, gameId, endTime, address, title }) =>
  `${username},${gameId},${endTime.getTime() / 1000},${address},${title}`

export const parseReferenceId = (referenceId) => {
  const [username, gameId, endTimeUnix, address, title] = referenceId.split(',')
  let endTime = new Date(endTimeUnix * 1000)
  return { username, gameId, endTime, address, title }
}

const fetchWyre = (url, data) => {
  const timestamp = Date.now()
  const urlWithTimestamp = url + `?timestamp=${timestamp}000`
  const stringData = JSON.stringify(data)
  return fetch(urlWithTimestamp, {
    method: data ? 'post' : 'get',
    ...(stringData && { body: stringData }), // Use an empty string for the HTTP body in GET requests
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Key': WYRE_API_KEY,
      'X-Api-Signature': signature(urlWithTimestamp, stringData),
    },
  }).then(async (res) => {
    if (res.status === 204) return `No content returned by Wyre - ${url}`
    const data = await res.json()
    if (data.errorCode) {
      throw {
        status: res.status,
        url,
        statusText: res.statusText,
        errorCode: data.errorCode,
        type: data.type,
        message: data.message,
      }
    }
    return data
  })
}

export const fetchOrder = (orderId) =>
  fetchWyre(`${API_URL}/orders/${orderId}/full`)

// TODO: Delete if unused
const _fetchReservation = (reservationId) =>
  fetchWyre(`${API_URL}/orders/reservation/${reservationId}`)

export const createMintReservation = async ({
  username,
  gameId,
  endTime,
  address,
  title,
}) => {
  try {
    const referenceId = getReferenceId({
      username,
      gameId,
      endTime,
      address,
      title,
    })
    const url = `${API_URL}/orders/reserve`
    const data = {
      sourceAmount: process.env.WYRE_MINT_USD_SOURCE_AMOUNT,
      paymentMethod: 'debit-card',
      amountIncludeFees: true,
      sourceCurrency: 'USD',
      destCurrency: 'USD',
      referenceId,
      hideTrackBtn: true,
      redirectUrl: WYRE_REDIRECT_URI,
      failureRedirectUrl: WYRE_REDIRECT_URI_ERROR,
      referrerAccountId: process.env.WYRE_ACCOUNT_ID_TREASURE,
      dest: `account:${process.env.WYRE_ACCOUNT_ID_TREASURE}`,
      country: 'US',
    }
    const response = await fetchWyre(url, data)
    logger.debug({ custom: data }, 'createMintReservation')
    logger.debug(`checkoutUrl: ${response.url}`)
    return response
  } catch (e) {
    logger.error(e)
    throw new Error('createMintReservation() Error creating Wyre reservation')
  }
}

export const createDepositReservation = async (destinationAddress) => {
  try {
    const url = `${API_URL}/orders/reserve`
    const data = {
      paymentMethod: 'debit-card',
      destCurrency: WYRE_TOKEN_SYMBOL,
      hideTrackBtn: true,
      redirectUrl: WYRE_REDIRECT_URI,
      failureRedirectUrl: WYRE_REDIRECT_URI_ERROR,
      referrerAccountId: process.env.WYRE_ACCOUNT_ID_TREASURE,
      dest: `matic:${destinationAddress}`,
      lockFields: ['destCurrency', 'dest', 'paymentMethod'],
    }
    const response = await fetchWyre(url, data)
    logger.debug({ custom: data }, 'createDepositReservation')
    logger.debug({ custom: response }, 'createDepositReservation response')
    if (!response.url) throw 'Error'
    logger.debug(`checkoutUrl: ${response.url}`)
    return { ...response, ...data }
  } catch (e) {
    logger.error(e)
    throw new Error(
      'createDepositReservation() Error creating Wyre reservation'
    )
  }
}

export const createPaymentMethod = async (details) => {
  const url = `${API_URL_V2}/paymentMethods`
  const args = {
    ...details,
    paymentMethodType: 'LOCAL_TRANSFER',
    chargebablePM: false,
  }
  const response = await fetchWyre(url, args)
  return response
}

export const createPaymentMethodFromPlaid = async (processorToken) => {
  const url = `${API_URL_V2}/paymentMethods`
  const args = {
    plaidProcessorToken: processorToken,
    paymentMethodType: 'LOCAL_TRANSFER',
    country: 'US', // Wyre only supports US Plaid accounts
    chargebablePM: false,
  }
  // console.log(args)
  const response = await fetchWyre(url, args)
  return response
}

export const fetchPaymentMethod = async (paymentMethodId) => {
  const url = `${API_URL_V2}/paymentMethod/${paymentMethodId}`
  const paymentMethod = await fetchWyre(url)
  return paymentMethod
}

export const attachBlockchainPaymentMethod = async (paymentMethodId) => {
  let url = `${API_URL_V2}/paymentMethod/${paymentMethodId}/attach`
  await fetchWyre(url, {
    blockchain: 'MATIC',
    notifyUrl: WYRE_WEBHOOK_URL,
  })
  // Bug with wyre returning 'No Content' status 204
  // TODO: remove the extra call once this is fixed
  const paymentMethod = await fetchPaymentMethod(paymentMethodId)
  if (!paymentMethod || !paymentMethod?.blockchains?.MATIC)
    throw 'Error attaching blockchain'
  return paymentMethod.blockchains.MATIC
}

export const processDepositOrder = async ({ order, reservation }) => {
  try {
    logger.debug({ custom: order }, 'order')
    const depositOrder = await db.depositOrder.findUnique({
      where: { reservation },
      include: { member: true },
    })
    logger.debug({ custom: depositOrder }, 'depositOrder')
    if (
      order?.status === 'COMPLETE' &&
      depositOrder &&
      depositOrder.status !== 'COMPLETE'
    ) {
      await db.depositOrder.update({
        where: { id: depositOrder.id },
        data: {
          status: 'COMPLETE',
          amount: order.usdPurchaseAmount,
          orderId: order.id,
          sourceCurrency: order.sourceCurrency,
          sourceAmount: order.sourceAmount,
          purchaseAmount: order.purchaseAmount,
          destCurrency: order.destCurrency,
          orderType: order.orderType,
        },
      })
      await sendDiscordAdminAlert({
        embed: {
          color: 3066993, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          title: `🤑 Deposit Success!`,
          thumbnail: { url: 'https://www.sendwyre.com/favicon-32x32.png' },
          description: `Wyre order ID: ${order.id}
          sourceCurrency: ${order.sourceCurrency}
usdSourceAmount: **$${order.usdSourceAmount}**
usdPurchaseAmount: **$${order.usdPurchaseAmount}**
dest: ${order.dest}
fees: $${Number(order.usdSourceAmount) - Number(order.usdPurchaseAmount)}
user: https://treasure.chess.com/members/${depositOrder?.member?.username}`,
          footer: { text: new Date().toString() },
          type: 'link',
        },
        channelName: 'orders',
      })
    } else {
      let extraDetails = ''
      if (!depositOrder)
        extraDetails = `Couldn't update database for reservation ${reservation}.`
      await sendDiscordAdminAlert({
        embed: {
          thumbnail: { url: 'https://www.sendwyre.com/favicon-32x32.png' },
          color: 2067276, // https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
          title: `❓🤑 Deposit data received`,
          description: `See below to confirm if successful
${extraDetails && `\`${extraDetails}\``}

${JSON.stringify(order, undefined, 4)}
`,
          footer: { text: new Date().toString() },
        },
        channelName: 'orders',
      })
    }
  } catch (e) {
    await sendDiscordAdminAlert({
      embed: {
        thumbnail: { url: 'https://www.sendwyre.com/favicon-32x32.png' },
        color: 2067276,
        title: `❓🤑 Deposit processing error`,
        description: `See below to confirm if successful.

${e}
${JSON.stringify(order, undefined, 4)}

[Wyre Dashboard](${DISCORD_WYRE_DASHBOARD_URL})`,
        footer: { text: new Date().toString() },
        type: 'link',
      },
      channelName: 'orders',
    })
    logger.error(`processDepositOrder() ${e}`)
    Sentry.captureException(e)
  }
}

const validateMintWyreOrder = (order) => {
  try {
    if (order.status !== 'COMPLETE') throw "status' not COMPLETE"
    if (order.sourceCurrency !== 'USD') throw "sourceCurrency' is not USD"
    if (order.destCurrency !== 'USD') throw "destCurrency' is not USD"
    // TODO: Check if this is still valid we finalize the fee amount with Wyre
    // if (order.usdSourceAmount != process.env.WYRE_MINT_USD_SOURCE_AMOUNT)
    //   throw `usdSourceAmount' is not ${process.env.WYRE_MINT_USD_SOURCE_AMOUNT}`
    //
    // if (order.usdPurchaseAmount != process.env.WYRE_MINT_USD_PURCHASE_AMOUNT)
    //   throw `usdPurchaseAmount' is not ${process.env.WYRE_MINT_USD_PURCHASE_AMOUNT}`
    const destString = `account:${process.env.WYRE_ACCOUNT_ID_TREASURE}`
    if (order.dest !== destString) throw `dest' is not ${destString}`
  } catch (e) {
    throw Error(
      `Wyre mint order invalid: 'order.${e} . Received from Wyre: ${JSON.stringify(
        order
      )}`
    )
  }
}

export const processWyreWebhook = async ({ body }) => {
  // Wyre order
  const { reservation, orderId } = body

  if (!reservation || !orderId)
    throw 'No reservation or orderId provided for Wyre order'
  // Fetch the username and inject into Sentry
  let username
  const mintPurchase = await db.mintPurchase.findUnique({
    where: { orderId }, // Wyre or Stripe
    include: { member: true },
  })
  const depositOrder = await db.depositOrder.findUnique({
    where: { orderId }, // Wyre only here
    include: { member: true },
  })
  if (mintPurchase) {
    username = mintPurchase.member.username
  } else {
    username = depositOrder.member.username
  }
  Sentry.setUser({ username })

  const order = await fetchOrder(orderId)
  if (order.status === 'PROCESSING') return // Don't throw errors and do nothing
  if (order.destCurrency === 'MUSDC') {
    // Deposit order
    return await processDepositOrder({ order, reservation })
  } else {
    // Mint order
    // Ensure orderId hasn't already used with a different reservation
    if (mintPurchase && mintPurchase.reservation !== reservation)
      throw new Error(
        `Wyre mint order invalid. orderId ${orderId} / reservation ${reservation} has already been used with reservation ${mintPurchase.reservation} and purchase #${mintPurchase.id}`
      )
    validateMintWyreOrder(order)
    return await processMintPurchaseOrder({ mintPurchase, orderId })
  }
}
