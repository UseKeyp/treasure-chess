const CryptoJS = require('crypto-js')
import { isProduction } from 'src/lib/helpers'
import fetch from 'node-fetch'

const WYRE_SECRET_KEY = process.env.WYRE_SECRET_KEY
const WYRE_API_KEY = process.env.WYRE_API_KEY
const API_URL = isProduction
  ? 'https://api.wyre.com/v3'
  : 'https://api.testwyre.com/v3'

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
  }).then((res) => {
    return res.json()
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
    const response = await fetchWyre(url, {
      sourceAmount: process.env.WYRE_MINT_USD_SOURCE_AMOUNT,
      paymentMethod: 'debit-card',
      amountIncludeFees: true,
      sourceCurrency: 'USD',
      destCurrency: 'USD',
      referenceId,
      hideTrackBtn: true,
      redirectUrl: `${process.env.APP_DOMAIN}/redirect/wyre`,
      failureRedirectUrl: `${process.env.APP_DOMAIN}/redirect/wyre`,
      referrerAccountId: process.env.WYRE_ACCOUNT_ID_TREASURE,
      dest: `account:${process.env.WYRE_ACCOUNT_ID_TREASURE}`,
      country: 'US',
    })
    return response
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error('createMintReservation() Error creating Wyre reservation')
  }
}
