# NFTs and IPFS

# Non-Fungible Tokens (NFT)

## What are NFTs?

Wanna dive deeper? Here are some additional resources:

- Ultimate source of truth: [Ethereum.org - ERC721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin.com - ERC721](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721)
- [OpenSea.io - NFT Tutorial](https://docs.opensea.io/docs/getting-started)

## What is Treasure Chess?

## What are Treasures?

# Nerdy developer stuff

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
  "description": "A chess game collectible. One of the players of this game minted this NFT. Create your own at https://treasure.chess.com",
  "external_url": "https://treasure.chess.com/treasures",
  "name": "My First Game",
  "attributes": [
    { "trait_type": "Rarity", "value": "Common" },
    { "trait_type": "Achievement 1", "value": "Play a game" },
    { "trait_type": "Achievement 2", "value": "Capture <4 pawns" },
    { "trait_type": "White Player", "value": "treasure_joseph" },
    { "trait_type": "Black Player", "value": "treasure_patrick" },
    { "trait_type": "Winner", "value": "white" },
    { "trait_type": "Opening", "value": "Bishop's Opening" },
    { "trait_type": "Rule Variant", "value": "Standard" },
    { "trait_type": "Time Control", "value": "600" }
  ],
  "animation_url": "ipfs://QmUkbaioXZb394DQZaH242ws4EZ63DVZvg6XVL3qjJBe1S",
  "image": "ipfs://Qma42X59cKjdqxfqg4CaWwXUcQPUJMFvW1PKrA73FCK4Jo"
}
```

## Minting Steps

Here's a basic outline of how we mint NFTs:

1. Generate an HTML file for the Treasure, and take a screenshot of it. Upload both the `.html` and `.png` files to the InterPlanetary File System (IPFS).
2. Calculate the unique Treasure ID (see "Calculating Treasure IDs")
3. Create a distinct Uniform Resource Identifier (URI) for the Treasure, based on the game attributes and achievements from the [@treasure-chess/chess-achievements](https://www.npmjs.com/package/@treasure-chess/chess-achievements) package. Upload this data to IPFS. Learn more about URIs on [Open Sea](https://docs.opensea.io/docs/metadata-standards)
4. Call the `mint()` function on the contract, and provide:

- IPFS link for the URI
- Treasure ID
- Achievement numbers

Additional related resources

- [ERC721 standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards)
