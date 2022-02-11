# Devops 🌊 Flow

# Branches

### `dev`

- Merge PRs to `dev`
- Very unstable
- Must pass action "CI"

### `sandbox`

- Merge from `dev` to `sandbox`
- More stable, used for new feature testing
- Must pass action "CI"

### `staging`

- Merge from `dev` to `staging`
- Runs action "Github Publish Docker" with tag prefix `staging`
- Must manually run action "GCP Publish Docker" with tag prefix `staging` (TODO: automate this?)
- Must pass action "CI"

### `main`

- Merge from `staging` to `main`
- Runs action "Github Publish Docker" with tag prefix `prod`
- Must manually run action "GCP Publish Docker" with tag prefix `prod`
- Must pass action "CI"

# Docker Containers

### GCP Publish Docker - Staging

1. Run "GCP Publish Docker" with Branch `staging` and tag `staging`
2. Check deployment status using ArgoCD & logs in Kibana

### GCP Publish Docker - Production

1. Run "GCP Publish Docker" with branch `main` and tag `prod`
2. Check deployment status using ArgoCD & logs in Kibana

# Logs, Analytics

TODO
https://argo-cd.readthedocs.io/en/stable/
https://kruschecompany.com/logstash-elasticsearch-kibana/#Install_Kibana

# Chess.com OAuth

`dev` config for Nikola

```
{
  "name": "Treasure Chess - Test",
  "logo": "https://treasure-chess-dev-4.vercel.app/logo-test.png",
  "redirectUri": [
    "http://0.0.0.0:8910/redirect/chess",
    "https://treasure-chess-dev-4.vercel.app/redirect/chess",
    "https://treasure-chess-sandbox-4.vercel.app/redirect/chess",
  ],
  "privacyPolicyUrl": "https://treasure.chess.com/privacy",
  "termsOfServiceUrl": "https://treasure.chess.com/terms"
}
```

`prod` config for Nikola

```
{
  "name": "Treasure Chess",
  "logo": "https://treasure.chess.com/logo.png",
  "redirectUri": [
    "https://treasure.chess.com/redirect/chess",
    "https://treasure.gcp-staging.chess-platform.com/redirect/chess"
  ],
  "privacyPolicyUrl": "https://treasure.chess.com/privacy",
  "termsOfServiceUrl": "https://treasure.chess.com/terms"
}
```

### Setting up a new Oauth client

1. Determine the `APP_DOMAIN` and the appropriate redirect URL. Don't forget to include the "/redirect/chess" at the end.
2. Ask Nikola to create a new oauth client

# Chess.com API

API auth tokens are needed to bypass API rate-limiting. They can be generated using any one of our own Chess accounts.

1. Uncomment the line in `api/src/lib/oAuth/chessDotCom.js` and log in.
2. Copy the results of auth token and set as `CHESS_API_ACCESS_TOKEN`.

Chess doesn’t check TTL, only that the auth token is signed by chess.com. You can use it forever in order to bypass rate limiting.

> NOTE: Since this is just a user's api token, make sure if it's exposed, it can't access that user's Torus wallet. Is this a problem?

# Contracts

```js
// dev - ropsten
CONTRACT_ADDRESS_TREASURE: '0xDf3a059c64f722915509498b35D0344c9053032E',
CONTRACT_ADDRESS_TREASURE_MARKET: '0x93bDEaC6A645793B2d451a7C57fa01CBD14e8040',
APP_ADMIN_WALLET_ADDRESS: '0xcb81A76a565aC4870EDA5B0e32c5a0D2ec734174'
PAYER_WALLET_ADDRESS: '0x6C19D6C5C07c16E80B1475f13485788cF3022763',

// sandbox - mumbai
CONTRACT_ADDRESS_TREASURE: '0x154154Eb0D213F0FAdc5664E0C421171335981d0',
CONTRACT_ADDRESS_TREASURE_MARKET: '0x6574193B98Bc37Ec8a43865D721713F9a8FbdC30',
APP_ADMIN_WALLET_ADDRESS: '0xcb81A76a565aC4870EDA5B0e32c5a0D2ec734174'
PAYER_WALLET_ADDRESS: '0x6C19D6C5C07c16E80B1475f13485788cF3022763',

// staging - matic
CONTRACT_ADDRESS_TREASURE: '0x0083682B3e7E860558E46055aF6fA3B6E2942Fd5'
CONTRACT_ADDRESS_TREASURE_MARKET: '0x80AA60F59a533ef048Bc058DB0487201Cc5e132d'
APP_ADMIN_WALLET_ADDRESS: '0x34EFD6D0E9c7252914040614F9760dB3A2e367B9',
PAYER_WALLET_ADDRESS: '0x8a6AD5CcCCFDe6730Db9526Bf3Dd96F4686202fC',

// prod - matic
CONTRACT_ADDRESS_TREASURE: '0x2035064B4E88e95e6Ee0422f390c843D40Fa85c2'
CONTRACT_ADDRESS_TREASURE_MARKET: '0x8d61d214b5288a388Ab38BaABA25b05d9637b62e'
APP_ADMIN_WALLET_ADDRESS: '0x34EFD6D0E9c7252914040614F9760dB3A2e367B9',
PAYER_WALLET_ADDRESS: '0x8a6AD5CcCCFDe6730Db9526Bf3Dd96F4686202fC',
```

# Config - Environment

## dev

Exclude `REDWOOD_API_URL` for vercel

```js
APP_DOMAIN=https://treasure-chess-sandbox-4.vercel.app
BASIC_AUTH_PASSWORD=pauliemorphy
ENCRYPTION_KEY=g1WM...
DATABASE_URL=postgres://...@ec2-44-194-112-166.compute-1.amazonaws.com:5432/d27fkbgjshtb7g?connection_limit=1
ETHEREUM_NETWORK_NAME=ropsten
```

## sandbox

Exclude `REDWOOD_API_URL` for vercel

```js
APP_DOMAIN=https://treasure-chess-sandbox-4.vercel.app
BASIC_AUTH_PASSWORD=pauliemorphy
ENCRYPTION_KEY=g1WM...
DATABASE_URL=postgres://...@ec2-34-239-196-254.compute-1.amazonaws.com:5432/deg6ltaujv3vei?connection_limit=1
ETHEREUM_NETWORK_NAME=mumbai
```

## staging

```js
// vault
APP_DOMAIN=https://treasure.gcp-staging.chess-platform.com
REDWOOD_API_URL=https://treasure.gcp-staging.chess-platform.com
ENCRYPTION_KEY=
DATABASE_URL=
ETHEREUM_NETWORK_NAME=matic
NODE_ENV=staging
```

## prod

```js
// vault
APP_DOMAIN=https://treasure.chess.com
REDWOOD_API_URL=https://treasure.chess.com
ENCRYPTION_KEY=
DATABASE_URL=
ETHEREUM_NETWORK_NAME=matic
NODE_ENV=prod
```

# Docs for GD

Secrets needed for web

```
# Only needed during build
APP_DOMAIN
REDWOOD_API_URL
ETHEREUM_NETWORK_NAME

# Needed at runtime
NODE_ENV
```

Secrets needed for api

```
APP_DOMAIN
REDWOOD_API_URL
ETHEREUM_NETWORK_NAME
NODE_ENV
DATABASE_URL
ENCRYPTION_KEY
```
