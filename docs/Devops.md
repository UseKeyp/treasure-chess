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

# Config - Environment

## Development

```js
APP_DOMAIN=https://treasure-chess-sandbox-4.vercel.app
BASIC_AUTH_PASSWORD=pauliemorphy
ENCRYPTION_KEY=g1WM...
DATABASE_URL=postgres://...@ec2-44-194-112-166.compute-1.amazonaws.com:5432/d27fkbgjshtb7g?connection_limit=1
CONTRACT_ADDRESS_TREASURE=0x54758647B008890E9C8545dD92464cea908d1dBA
CONTRACT_ADDRESS_TREASURE_MARKET=0xAca9dF519620b3351C65F96e30f47851BC5946A6
ETHEREUM_NETWORK_NAME=ropsten
```

## Sandbox

Exclude `REDWOOD_API_URL` for vercel

```js
APP_DOMAIN=https://treasure-chess-sandbox-4.vercel.app
BASIC_AUTH_PASSWORD=pauliemorphy
ENCRYPTION_KEY=g1WM...
DATABASE_URL=postgres://...@ec2-34-239-196-254.compute-1.amazonaws.com:5432/deg6ltaujv3vei?connection_limit=1
CONTRACT_ADDRESS_TREASURE=0x154154Eb0D213F0FAdc5664E0C421171335981d0
CONTRACT_ADDRESS_TREASURE_MARKET=0x6574193B98Bc37Ec8a43865D721713F9a8FbdC30
ETHEREUM_NETWORK_NAME=ropsten
```

## Staging - container tag prefix `staging`

CONTRACT_ADDRESS_PAYMENT_TOKEN
CONTRACT_ADDRESS_TREASURE
CONTRACT_ADDRESS_TREASURE_MARKET

```js
// vault
APP_DOMAIN=https://treasure.gcp-staging.chess-platform.com
REDWOOD_API_URL=https://treasure.gcp-staging.chess-platform.com
ENCRYPTION_KEY=
DATABASE_URL=
ETHEREUM_NETWORK_NAME=matic
NODE_ENV=staging
```

## Production - container tag prefix `prod`

CONTRACT_ADDRESS_PAYMENT_TOKEN
CONTRACT_ADDRESS_TREASURE
CONTRACT_ADDRESS_TREASURE_MARKET

```js
// vault
APP_DOMAIN=https://treasure.chess.com
REDWOOD_API_URL=https://treasure.chess.com
ENCRYPTION_KEY= (needs change)
DATABASE_URL= (needs change)
ETHEREUM_NETWORK_NAME=matic
NODE_ENV=prod
```

# Docs for GD

Secrets needed for web

```
APP_DOMAIN
REDWOOD_API_URL
ETHEREUM_NETWORK_NAME
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
