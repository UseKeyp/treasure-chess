const CryptoJS = require('crypto-js')
const WYRE_SECRET_KEY = process.env.WYRE_SECRET_KEY
const WYRE_API_KEY = process.env.WYRE_API_KEY
const API_URL = process.env.WYRE_API_URL

const signature = (url, data) => {
  const dataToBeSigned = url + data
  const token = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(
      dataToBeSigned.toString(CryptoJS.enc.Utf8),
      WYRE_SECRET_KEY
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
  let timestamp = Date.now()
  const urlWithTimestamp = url + `?timestamp=${timestamp}`
  const stringData = JSON.stringify(data)
  return fetch(urlWithTimestamp, {
    method: data ? 'post' : 'get',
    body: stringData || '', // Use an empty string for the HTTP body in GET requests
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Key': WYRE_API_KEY,
      'X-Api-Signature': signature(urlWithTimestamp, stringData),
    },
  }).then((res) => res.json())
}

const fetchOrder = (orderId) => fetchWyre(`${API_URL}/orders/${orderId}/full`)

export const createMintReservation = async ({
  sourceAmount = 6,
  referenceId,
}) => {
  try {
    const url = `${API_URL}/orders/reserve`
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
    return response.url
  } catch (e) {
    // TODO:  Add Logging
    console.log(e)
    throw new Error('createMintReservation() Error creating Wyre reservation')
  }
}

export const processOrder = async (orderId) => {
  const order = await fetchOrder(orderId)
  console.log(order)
  // TODO: Validate order

  // TODO: Get order details from referenceId
  // const {address, username, gameId, endTime} = parseReferenceId(referenceId)

  // TODO: Save mint order to database

  // TODO: Trigger minting process
}
