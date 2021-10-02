# Redwood

> **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started

- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

##### Dependencies

1. `nvm`
2. Node version 14, because that's what redwood uses. Try `nvm install 14`, then `nvm use 14`.

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

After running this dev server, access the Graphql playground at: http://localhost:8910/api/graphql

Check out the components in the Story Book

```terminal
yarn rw storybook
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

### Local Postgres Setup

See docs for [Local Postgres Setup](https://redwoodjs.com/docs/local-postgres-setup)

After you've set up postgres, run `yarn rw prisma migrate dev`

# Usage

Treasure ID is calculated as `hash(moves + endTime + white/black variant)`. We use the games End Time as the date for the game. You can fetch details about any game via the Chess.com public API like this:

```js
// Note: single digit months must be pre-pended with a "0"
// eg `https://api.chess.com/pub/player/jschiarizzi/games/2021/02`
// See https://www.chess.com/news/view/published-data-api
const res = await fetch(
  `https://api.chess.com/pub/player/${id}/games/${year}/${month}`
)
const games = (await res.json()).games
const endTime = games[0].end_time
```

You can also calculate End Time from the PGN. Grab these two values:

```js
// pgn
[EndDate "2021.02.08"]
[EndTime "01:52:23"]
```

In your browser or Javascript console, convert to UNIX timestamp like this:

```js
Date.parse('2021-02-08 1:52:23.000Z') / 1000
// > 1612749143
```

Next get the moves from the PGN.

```js
let moves
games[0].pgn.split(/\n/).map((line) => {
  if (line.match(/1./))
    moves = line
      // Remove the winner from the end eg. "0-1" "1-0" or "1/2"
      .split(/[0-21/2]+-/)[0]
      // Remove any timestamps eg. "{[%clk 0:04:58.7]}"
      .replace(/\{.+?\} /g, '')
      // Remove any whitespace
      .trim()
})
```

Now that you have all the required variables, create the hash as follows:

```js
const { id: sha3 } = require('@ethersproject/hash')

export const getTreasureId = ({
  moves, // String of moves from the PGN
  endTime, // String of UNIX timecode from chess.com API
  cardColor, // String of version of treasure: "white" or "black"
}) => {
  return sha3(moves + endTime + variant)
  // eg. sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6"+"1612749143"+"white")
}
```

# Devops

### Serverless Considerations

The built api must be <50MB for Vercel. Use these commands to check the current size

```js
yarn rw build api
yarn zip-it-and-ship-it api/dist/functions/ zipped
# In your file explorer check the size of /zipped/graphql.zip
```

### Docker

Images are built via Github Action. To build the images locally:

```bash
# web
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f web/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local


# api
docker build . -t pi0neerpat/treasure-chess-redwood-web-main -f api/Dockerfile \
--build-arg NODE_ENV=development \
--build-arg RUNTIME_ENV=local \
--build-arg DATABASE_URL=<MY_DATABASE_URL>
```

Run an image locally:

```bash
# Authenticate
docker login https://ghcr.io -u USERNAME -p GITHUB_PAT

# Pull the images (web and api)
docker pull ghcr.io/pi0neerpat/treasure-chess-redwood-web-main:latest
docker pull ghcr.io/pi0neerpat/treasure-chess-redwood-api-main:latest

# Run
docker-compose up

# Alternatively, run a single image
docker run -it --rm \
       -p 8910:8910 \
       ghcr.io/pi0neerpat/treasure-chess-redwood-api-main:latest
```

## URIs and IPFS

The Token URI stored on-chain must point to a json to play nice with third parties. It should include a field for image. Like this:

```javascript
{"image": "ipfs://ipfshash-of-image", "attributes": [
  {"trait_type": "Achievement 1", "value": "did a thing"},
  {"trait_type": "Achievement 2", "value": "another thing"},
  {"trait_type": "Achievement 3", "value": "a third thing"},
  {"trait_type": "Card Level", "value": "Rare"}
]}
```

### Flow

1. Upload image to IPFS, get IPFS link for image
2. Create a json, add the image IPFS link as `image` field.
3. Upload json to IPFS, get IPFS link for json
4. Call `mint` function via web3: supply json's IPFS hash, also supply the id hash of the moves+stuff
