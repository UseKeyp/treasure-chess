import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from 'plaid'
import Sentry from 'src/lib/sentry'

import {
  createPaymentMethodFromPlaid,
  attachBlockchainPaymentMethod,
} from 'src/lib/wyre'
import { db } from 'src/lib/db'
import { isProduction } from 'src/lib/helpers'

export const PLAID = 'PLAID'
export const WYRE = 'WYRE'

const PLAID_SCOPE = [Products.Auth]
const PLAID_REDIRECT_URI = process.env.APP_DOMAIN + '/redirect/plaid'

const PLAID_WEBHOOK_URL = isProduction
  ? 'https://treasure.chess.com/api/plaid'
  : 'https://tc-checkout-dev.ngrok.io/api/plaid'

const getEnvironment = () => {
  if (process.env.NODE_ENV === 'staging') return 'development'
  // TODO: Change to production
  else if (process.env.NODE_ENV === 'prod') return 'development'
  return 'sandbox'
}
const configuration = new Configuration({
  basePath: PlaidEnvironments[getEnvironment()],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_CLIENT_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
})
const client = new PlaidApi(configuration)

export const createPlaidLink = async () => {
  try {
    const request = {
      user: { client_user_id: context.currentUser.id },
      client_name: 'Treasure Chess',
      products: PLAID_SCOPE,
      language: 'en', // TODO get from user's account
      webhook: PLAID_WEBHOOK_URL,
      redirect_uri: PLAID_REDIRECT_URI,
      country_codes: [CountryCode.Us], // TODO: How do we know this?
    }
    const createTokenResponse = await client.linkTokenCreate(request)
    if (!createTokenResponse?.data?.link_token) throw 'No link token returned'
    return createTokenResponse.data.link_token
  } catch (e) {
    throw `Something went wrong`
  }
}

const onSubmitCode = async ({ code, accountId }) => {
  try {
    /* eslint-disable camelcase*/
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: code,
    })
    const accessToken = tokenResponse.data.access_token
    return {
      accessToken,
      accountId,
    }
  } catch (e) {
    Sentry.captureException(e)
    throw `onSubmitCode() ${e}`
  }
}

const onConnected = async ({ accessToken, accountId }) => {
  try {
    const request = {
      access_token: accessToken,
      account_id: accountId,
      processor: 'wyre',
    }
    // Get the account nickname needed for wyre
    // TODO: Remove this old way for getting accounts once we remove
    // Identity product version below.
    // const { data: accountsResponse } = await client.accountsGet({
    //   access_token: accessToken,
    // })
    // const account = accountsResponse.accounts.find(
    //   (account) =>
    //     account.type === 'depository' &&
    //     ['checking', 'savings'].includes(account.subtype)
    // )
    // if (!account)
    //   throw 'No account found matching the criteria - checking or savings'
    // const accountNickname = `${account.name} - ${account.subtype}`
    const { data: identityResponse } = await client.identityGet({
      access_token: accessToken,
    })
    const itemId = identityResponse.item.item_id // For record-keeping purposes
    const account = identityResponse.accounts.find(
      (acc) => acc.account_id === accountId
    )
    const {
      owners,
      verification_status,
      mask,
      balances: { iso_currency_code },
    } = account
    const email = owners[0].emails.find((item) => item.primary).data
    const accountNickname = `${account.name} - ${account.subtype}`
    // Create a processor token for a specific account id.
    const processorTokenResponse = await client.processorTokenCreate(request)
    const processorToken = processorTokenResponse.data.processor_token
    // Pass processor token to Wyre
    const paymentMethod = await createPaymentMethodFromPlaid(processorToken)
    // Attach blockchain address to Payment Method
    const address = await attachBlockchainPaymentMethod(paymentMethod.id)
    // Save details to the user
    const ramp = await db.ramp.create({
      data: {
        address,
        email,
        itemId,
        mask,
        accountNickname,
        accountId,
        verificationStatus: verification_status,
        isoCurrencyCode: iso_currency_code,
        paymentMethodId: paymentMethod.id,
        type: WYRE,
        member: { connect: { id: context.currentUser.id } },
      },
    })
    return { status: 'SUCCESS', ramp }
  } catch (e) {
    Sentry.captureException(e)
    throw `onConnected() ${e}`
  }
}

export const provider = { onSubmitCode, onConnected }

// Used for testing purposes only in "sandbox" environment
export const getSandboxPublicToken = async () => {
  try {
    const publicTokenRequest = {
      institution_id: 'ins_132241',
      initial_products: PLAID_SCOPE,
    }
    const publicTokenResponse = await client.sandboxPublicTokenCreate(
      publicTokenRequest
    )
    const publicToken = publicTokenResponse.data.public_token
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: publicToken,
    })
    const accessToken = tokenResponse.data.access_token
    const { data: accountsResponse } = await client.accountsGet({
      access_token: accessToken,
    })
    const account = accountsResponse.accounts.find(
      (account) =>
        account.type === 'depository' &&
        ['checking', 'savings'].includes(account.subtype)
    )
    return { accountId: account.account_id, code: publicToken }
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
  }
}
