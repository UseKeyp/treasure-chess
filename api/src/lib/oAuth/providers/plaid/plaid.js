export const handlePlaidConnection = async ({ code, accountId }) => {
  try {
    /* eslint-disable camelcase*/
    const tokenResponse = await client.itemPublicTokenExchange({
      public_token: code,
    })
    const accessToken = tokenResponse.data.access_token
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
    return ramp
  } catch (e) {
    /* eslint-enable no-console */
    Sentry.captureException(e)
    throw e
  }
}

// Used for testing purposes only in "sandbox" environment
export const getSandboxPublicToken = async () => {
  try {
    const publicTokenRequest = {
      institution_id: 'ins_132241',
      initial_products: PRODUCTS_SCOPE,
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
