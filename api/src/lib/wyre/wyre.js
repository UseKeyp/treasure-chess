const CryptoJS = require('crypto-js')
const WYRE_SECRET_KEY = process.env.WYRE_SECRET_KEY
const WYRE_API_KEY = process.env.WYRE_API_KEY
const API_URL = process.env.WYRE_API_URL

const signature = (url, data) => {
  const dataToBeSigned = url + data
  const token = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(
      dataToBeSigned.toString(CryptoJS.enc.Utf8),
      YOUR_SECRET_KEY
    )
  )
  return token
}

export const getReferenceId = ({ username, gameId, endTime, address }) => {
  return `${username}-${gameId}-${endTime}-${address}`
}

export const parseReferenceId = (referenceId) => {
  const [username, gameId, endTime, address] = referenceId.split('-')
  return { username, gameId, endTime, address }
}

const fetchWyre = (url, data) => {
  return fetch(url, {
    method: data ? 'post' : 'get',
    body: data || '', // Use an empty string for the HTTP body in GET requests
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Key': WYRE_API_KEY,
      'X-Api-Signature': signature(url, data),
    },
  }).then((res) => res.json())
}

export const createReservation = async ({ sourceAmount = 6, referenceId }) => {
  let timestamp = Date.now()
  const url = `${API_URL}/orders/reserve?timestamp=${timestamp}`
  const response = await fetchWyre(url, {
    sourceAmount,
    paymentMethod: 'debit-card',
    amountIncludeFees: true,
    sourceCurrency: 'USD',
    destCurrency: 'USD',
    referenceId,
    redirectUrl: `${process.env.PUBLIC_REDIRECT_URL}/wyre`,
    failureRedirectUrl: `${process.env.PUBLIC_REDIRECT_URL}/wyre`,
    referrerAccountId: process.env.WYRE_ACCOUNT_ID_TREASURE,
    dest: `account:${process.env.WYRE_ACCOUNT_ID_TREASURE}`,
    country: 'US',
  })
  console.log(response)
  return response
}
