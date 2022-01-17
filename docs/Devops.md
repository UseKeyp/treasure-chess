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

https://argo-cd.readthedocs.io/en/stable/
https://kruschecompany.com/logstash-elasticsearch-kibana/#Install_Kibana

# Config - Chess.com OAuth / API

Development

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

Production

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

### 1. Development

- Redirect URL https://treasure-chess-dev-4.vercel.app/redirect/chess
- CHESS_API_ACCESS_TOKEN eyJ0...
- Image <img src="./icon-large-dev.png" width="100">

### 2. Sandbox

- Redirect URL https://treasure-chess-sandbox-4.vercel.app/redirect/chess
- CHESS_API_ACCESS_TOKEN eyJ0...
- Image <img src="./icon-large-sandbox.png" width="100">

### 3. Staging

NOTE: For `CHESS_API_ACCESS_TOKEN`, they don’t check TTL, only check that they are signed by chess.com keys. You can obtain one and use it forever in order to bypass rate limiting. Since this is just a user's api token, make sure if it's exposed, it can't access that user's Torus wallet. Create one by uncommenting the line in `api/src/lib/oAuth/chessDotCom.js` and then logging in.

- Redirect URL https://treasure.gcp-staging.chess-platform.com/redirect/chess
- CHESS_API_ACCESS_TOKEN (???)
- Image <img src="./icon-large-staging.png" width="100">

### 4. Production

- Redirect URL https://treasure.chess.com/redirect/chess
- CHESS_API_ACCESS_TOKEN (???)
- Image <img src="./icon-large.png" width="100">

### For all environments

- CHESS_API_URL https://api.chess.com

### Setting up a new environment

1. Determine the `APP_DOMAIN`
2. Ask Nikola to create a new oauth client with the appropriate redirect URL. Don't forget to include the "/redirect/chess" at the end.

# Config - Environment

## Development

Exclude `REDWOOD_API_URL` for vercel builds

```js
APP_DOMAIN=https://treasure-chess-sandbox-4.vercel.app
BASIC_AUTH_PASSWORD=pauliemorphy
ENCRYPTION_KEY=g1WM...
ENCRYPTION_IV=999...
DATABASE_URL=postgres://...@ec2-44-194-112-166.compute-1.amazonaws.com:5432/d27fkbgjshtb7g?connection_limit=1
CONTRACT_ADDRESS_TREASURE=0xCb9fC489C31309fD66F2F9b52593a699dAF49C86
CONTRACT_ADDRESS_TREASURE_MARKET=0xc9234371D7943C0A333AB1eE4e9E6583323efD5d
ETHEREUM_NETWORK_NAME=ropsten
```

## Sandbox

Exclude `REDWOOD_API_URL` for vercel

```js
APP_DOMAIN=https://treasure-chess-sandbox-4.vercel.app
BASIC_AUTH_PASSWORD=pauliemorphy
ENCRYPTION_KEY=g1WM...
ENCRYPTION_IV=999...
DATABASE_URL=postgres://...@ec2-34-239-196-254.compute-1.amazonaws.com:5432/deg6ltaujv3vei?connection_limit=1
CONTRACT_ADDRESS_TREASURE=0x271DEb88eA5543c131A998327314dc02eAEc8a9C
CONTRACT_ADDRESS_TREASURE_MARKET=0x55C0029BD0536Ac7EC2Ddd673436a0703E2081a9
ETHEREUM_NETWORK_NAME=ropsten
```

## Staging - container tag prefix `staging`

Environment is the same as for Production, except for the following:

```js
APP_DOMAIN=https://treasure.gcp-staging.chess-platform.com
// For now these are different, but they should be the same
DATABASE_URL= sandbox db
ETHEREUM_NETWORK_NAME=ropsten
CONTRACT_ADDRESS_TREASURE=
CONTRACT_ADDRESS_TREASURE_MARKET=
```

## Production - container tag prefix `prod`

```js
APP_DOMAIN=https://treasure.chess.com
ENCRYPTION_KEY=
ENCRYPTION_IV=
DATABASE_URL=
CONTRACT_ADDRESS_TREASURE=
CONTRACT_ADDRESS_TREASURE_MARKET=
ETHEREUM_NETWORK_NAME=polygon
```

# Ngrok

Useful for testing webhook from Wyre. Open a ngrok to your local dev environment

```bash
ngrok http --host-header=rewrite 10.61.141.225:8910
# OR using specified domain
ngrok http -region=us --hostname=tc-checkout-dev.ngrok.io --host-header=rewrite 0.0.0.0:8910

> Forwarding https://tc-checkout-dev.ngrok.io -> http://0.0.0.0:8910
```
