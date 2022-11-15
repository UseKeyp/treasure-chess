# Torus

## 📑 Resources

- Developer Dashboard [link](https://developer.tor.us/home/customauth)
- Custom Auth Docs [link](https://docs.tor.us/customauth/setting-up-verifiers/custom-verifier)

## 🌚 Development

Values shown here are for chess-4.com

| Verifier Property   | Value                                       | Notes                                                                           |
| :------------------ | :------------------------------------------ | :------------------------------------------------------------------------------ |
| Verifier Identifier | `treasure-chess-sandbox`                    |                                                                                 |
| Verifier Type       | `custom`                                    |                                                                                 |
| JWT Verifier ID     | `user_id`                                   | User's identity. Same as the `player_id` in the chess.com public API            |
| JWK Endpoint        | `https://oauth.chess.com/certs`             | See below                                                                       |
| JWT Validation (1)  | iss: `https://oauth.chess.com`              |                                                                                 |
| JWT Validation (2)  | aud: `40c5d866-77cd-11ec-a560-67b86d6160ee` | IMPORTANT! Ensures no other chess.com app can gain access to our user's wallets |

The `/certs` endpoint for chess-x.com is password-protected, so Torus nodes cannot access it. You'll need to copy the certs and host them yourself. Eg for chess-4.com you can use this gist link: https://gist.githubusercontent.com/pi0neerpat/baf278f9c16aea141356a61d8aaae93d/raw/1ee9f999f453c41efa0360af3487b85f1abfa8bf/certs.json

![](./assets/verifier-creation.png)

## 🌞 Production

| Verifier Property   | Value                           | Notes                                                                           |
| :------------------ | :------------------------------ | :------------------------------------------------------------------------------ |
| Verifier Identifier | `treasure-chess-prod-1`         |                                                                                 |
| Verifier Type       | `custom`                        |                                                                                 |
| JWT Verifier ID     | `user_id`                       | User's identity. Same as `player_id` in the chess.com public API                |
| JWK Endpoint        | `https://oauth.chess.com/certs` |                                                                                 |
| JWT Validation (1)  | iss: `https://oauth.chess.com`  |                                                                                 |
| JWT Validation (2)  | aud: `45...`                    | IMPORTANT! Ensures no other chess.com app can gain access to our user's wallets |

#### Social Login Example

Example for Discord

```js
import { Web3AuthCore } from '@web3auth/core'
import { CHAIN_NAMESPACES } from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'

const clientId =
  'BLNqDC2RlgdIYg_1rrsLfZGR_B8MQH_qaSQr2KnYc0wwDXi0XluALaFHD61uKPi22d1NZyxWGpFvRzTZoQtAKBU'
const web3authCore = new Web3AuthCore({
  clientId,
  chainConfig: {
    // this is ethereum chain config, change if other chain(Solana, Polygon)
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x13881',
    rpcTarget: 'https://rpc.ankr.com/polygon_mumbai',
    blockExplorer: 'https://mumbai.polygonscan.com/',
    ticker: 'MATIC',
    tickerName: 'Matic',
  },
})
const adapter = new OpenloginAdapter({
  adapterSettings: {
    network: 'testnet',
    uxMode: 'redirect', // other option: popup
    loginConfig: {
      discord: {
        name: 'any name',
        verifier: 'feather-collabland-demo',
        typeOfLogin: 'discord',
        clientId: '1023392742707044492',
      },
    },
  },
})
web3authCore.configureAdapter(adapter)

const onLoginWeb3Auth = async () => {
  await web3authCore.init()
  // call below code when user clicks on login button
  // it will use discord login with openlogin's authentication
  await web3authCore.connectTo(adapter.name, { loginProvider: 'discord' })
  const user = await web3authCore.getUserInfo()
  console.log('User info', user)
}
```
