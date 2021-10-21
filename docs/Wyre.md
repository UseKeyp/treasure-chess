# Wyre

INTERNAL DOCUMENTATION ONLY - DO NOT SHARE

# 🌚 Development

Overview:

1. Create the reservation, and save `reservation` and details about the game to the database
2. Send user to the checkout URL
3. Receive order success webhook from Wyre
4. Validate the order
5. Mint the treasure, or show a wallet balance change

## Test checkout

Make a test purchase using these details:

```js
Test Account
4111 1111 1111 1111
123 Abc St
23456
Cityville
test@wyre.com
2254655767
// Bank and Phone verification codes:
000000
```

## 1. Create Reservation

#### Questions

Endpoint: `/orders/reserve`
Example Request:

```json
{
  "sourceAmount": "6",
  "paymentMethod": "debit-card",
  "amountIncludeFees": true,
  "sourceCurrency": "USD",
  "destCurrency": "USD",
  "referenceId": "treasure_joseph,27130135607,1633391494,0xCC02B1D54C4309784Ec257f18D0BfB77DE238D49,My First Game",
  "hideTrackBtn": true,
  "redirectUrl": "http://0.0.0.0:8910/redirect/wyre",
  "failureRedirectUrl": "http://0.0.0.0:8910/redirect/wyre",
  "referrerAccountId": "AC_7RYDPWJHAL9",
  "dest": "account:AC_7RYDPWJHAL9",
  "country": "US"
}
```

Example Response:

```js
{
  url: 'https://wyr....'
}
```

TODO:

1. How do we know the user's country before the order is placed?

## 2. Send user to checkout URL

Open a new window for the checkout

## 3. Order Success Webhook

A webhook is registered with Wyre, where they will send all order updates.

Treasure Chess endpoint: `/api/checkout`

Here's an example success order, which can be sent via Postman. Note: this must be sent as a string in the body of the POST request.

```json
{
  "accountId": "AC_7RYDPWJHAL9",
  "orderId": "WO_GUCUERG99U",
  "orderStatus": "COMPLETE",
  "transferId": "TF_L2EXQ3M2QZN",
  "failedReason": null,
  "error": null,
  "reservation": "3CVLQTU6U6NWBHJD6CEL",
  "email": "test@wyre.com"
}
```

## 4. Validate the Order

Once a webhook is received, we use the orderId to fetch the order details directly directly from Wyre. We cannot trust that any webhook we receive is valid.

Wyre endpoint: `/orders/<orderId>/full`
Example response:

```js
data: {
accountId: "account:AC_ATE69GGNMNC"
blockchainNetworkTx: null
dest: "bitcoin:n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF"
destAmount: 0.00015081
fees: "{\"USD\":0.44,\"BTC\":0.00005}"
orderId: "WO_6JC7TUV32G"
transferId: "TF_A6MUVDYUGRW"
}
type: "paymentSuccess"
}
```

Then we use the `reservation` to lookup the `MintPurchase` in our database, to get the details about the game to mint.

## 4. Mint the NFT

Submit the game data to be minted!

### Status codes

|         Exception          |                                                      Description                                                      | HTTPs Status Code |
| :------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :---------------: |
|    ValidationException     |                                  The action failed due to problems with the request.                                  |        400        |
|      UnknownException      |                          A problem with our services internally. This should rarely happen.                           |        500        |
| InsufficientFundsException |                  You requested the use of more funds in the specified currency than were available.                   |        400        |
|     RateLimitException     |          Your requests have exceeded your usage restrictions. Please contact us if you need this increased.           |        429        |
|   AccessDeniedException    |                            You lack sufficient privilege to perform the requested action.                             |        401        |
|     TransferException      |                                 There was a problem completing your transfer request.                                 |        400        |
|     NotFoundException      |                                   You requested something that couldn't be located.                                   |        400        |
|    ValidationException     |                                There was a problem validating the input you supplied.                                 |        400        |
|  CustomerSupportException  |                              Please contact us at support@sendwyre.com to resolve this!                               |        400        |
|    MFARequiredException    | An MFA action is required to complete the request. In general you should not get this exception while using API keys. |        400        |

## Creating the checkout URL

http://7269-208-46-234-70.ngrok.io/api/checkout/?orderId=WO_87736T9Y8X

?accountId=account%3AAC_243T39R7NQZ
&blockchainNetworkTx
&dest=account%3AAC_7RYDPWJHAL9
&destAmount=1
&fees={"USD"%3A5}
&orderId=WO_87736T9Y8X
&transferId=TF_JB97DTVUPTU

# 🌞 Production

- Wyre team must update our webhook URL to https://treasure.chess.com/api/checkout
- Wyre team must enable USD->USD transfers to our account
