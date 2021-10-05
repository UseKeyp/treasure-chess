# NFTs and IPFS

## Calculating Treasure IDs

Treasure ID is calculated as `hash(moves + endTime + white/black variant)`. We use the games End Time as the date for the game. You can fetch details about any game via the Chess.com public API like this:

```js
// Note: single digit months must be pre-pended with a "0"
// eg `https://api.chess.com/pub/player/jschiarizzi/games/2021/02`
// API Documentation: https://www.chess.com/news/view/published-data-api

const res = await fetch(
  `https://api.chess.com/pub/player/${id}/games/${year}/${month}`
)
const games = (await res.json()).games
const endTime = games[0].end_time // Using the first game as an example
```

You can also calculate `end_time` yourself using the PGN. Grab these two values:

```js
// pgn
[EndDate "2021.02.08"]
[EndTime "01:52:23"]
```

In a browser or JS console, convert to UNIX timestamp like this:

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

Now that you have all the required variables, create the hash using `@ethersproject/hash`:

```js
const { id: sha3 } = require('@ethersproject/hash')

export const getTreasureId = ({
  moves, // String of moves from the PGN (without timestamps)
  endTime, // Timecode from chess.com API
  cardColor, // String of version of treasure: "white" or "black"
}) => {
  const endTimeUnix = Date.parse(endTime) / 1000
  return sha3(`${moves} ${endTimeUnix} ${cardColor}`)
  // eg. sha3("1. d4 d5 2. c4 e6 3. Nc3 c6 4. e3 Nf6 1612749143 white")
}
```

## Token URI

The URI stored on-chain must point to a JSON object in order to work across all 3rd-party NFT apps. Treasure Chess NFTs include a field for image, for example:

```json
{
  "image": "ipfs://ipfshash-of-image",
  "attributes": [
    { "trait_type": "Achievement 1", "value": "did a thing" },
    { "trait_type": "Achievement 2", "value": "another thing" },
    { "trait_type": "Achievement 3", "value": "a third thing" },
    { "trait_type": "Card Level", "value": "Rare" }
  ]
}
```

## Minting Steps

Here's a basic outline of how we mint NFTs

1. Upload static image to IPFS, and get the IPFS link
2. Create a JSON with the image IPFS link as `image` field.
3. Upload JSON to IPFS, and get IPFS link
4. Calculate the unique Treasure ID (see "Calculating Treasure IDs")
5. Call `mint` on the contract with the JSON IPFS hash and the Treasure ID.
