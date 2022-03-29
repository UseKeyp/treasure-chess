const CryptoJS = require('crypto-js')
import fetch from 'node-fetch'

import { isProduction } from 'src/lib/helpers'
import { logger } from 'src/lib/logger'

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
const WYRE_REDIRECT_URI_ERROR = `${process.env.APP_DOMAIN}/redirect/wyre/error`

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
    if (!response.url) throw 'Error'
    logger.debug(`checkoutUrl: ${response.url}`)
    return response
  } catch (e) {
    logger.error(e)
    throw new Error(
      'createDepositReservation() Error creating Wyre reservation'
    )
  }
}
export const createWithdrawReservation = async () => {
  try {
    // TODO: Finish implementing off-ramp
    const url = `${API_URL}/transfers`
    const response = await fetchWyre(url)
    return response
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
    blockchain: 'ETH',
    notifyUrl: WYRE_WEBHOOK_URL,
  })
  // Bug with wyre returning 'No Content' status 204
  // TODO: remove the extra call once this is fixed
  const paymentMethod = await fetchPaymentMethod(paymentMethodId)
  if (!paymentMethod || !paymentMethod?.blockchains?.ETH)
    throw 'Error attaching blockchain'
  return paymentMethod.blockchains.ETH
}
