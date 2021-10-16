# Wyre

INTERNAL DOCUMENTATION ONLY - DO NOT SHARE

# 🌚 Development

Overview:

1. Create the reservation, get `reservation`
2. Create the Checkout URL and send the user
3. Receive order success webhook from Wyre
4. Mint the treasure, or show a wallet balance change

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

````js
{
  url: "https://wyr...."
}
```


TODO:

1. How do we know the user's country before the order is placed?

### Order Success Webhook

Example success order, which can be sent via Postman. Note: this must be sent as a string in the body of the POST request.

```json
{
  "accountId": "AC_7RYDPWJHAL9",
  "orderId": "WO_M4FGRANB44",
  "orderStatus": "COMPLETE",
  "transferId": "TF_L2EXQ3M2QZN",
  "failedReason": null,
  "error": null,
  "reservation": "3CVLQTU6U6NWBHJD6CEL",
  "email": "test@wyre.com"
}
````

Additional successful orders:

- WO_87736T9Y8X

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

### Check Order Status

https://api.testwyre.com/v3/orders/{orderId}

https://api.sendwyre.com/v2/transfer/[transferId]/track

paymentSuccess Callback
once a Wyre has initiated sending destCurrency to the user.

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
