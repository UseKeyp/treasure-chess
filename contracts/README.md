# @treasure-chess/contracts

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#docs">Docs</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## Docs

### Treasure Tips, Tricks, and Design Decisions

- No meta transactions on the main Treasure contract, since only the admin controlled accounts can call minting function , and we only need to make transfers free
- contract name will be changed at the end, since we want to reserve the url /TreasureChess on third party marketplaces and don't want it scrapped if we decide to test on polygon later.
- Overrided `approveForAll` check so that OpenSea and our marketplace do not require an approval transaction for use.
- Achievements are on-chain and also can be part of json URI so make it something that onchain governance can decide
- The `Owner` should be updated to a multisig wallet (gnosis safe) controlled by the dev team, possibly Victor/a lawyer + a DAO for tiebreakers, while `Admins` should be internal addresses controlled

## About The Project

A simple hardhat template modeled off of running `npx hardhat init`.

This project includes:

- [hardhat-deploy](https://hardhat.org/plugins/hardhat-deploy.html): this is a powerful plugin for deployment and testing, allows you to utilize your deploy for testing and makes it easy to deploy to live networks. Also includes neat features like dependencies (allows handling the case where one deployment is dependent on another).
- [hardhat-prettier](https://www.npmjs.com/package/hardhat-prettier): a plugin that makes it easy to format solidity files based on rules set in `.prettierrc`.
  - `npx hardhat format`
- [hardhat-typechain](https://hardhat.org/plugins/hardhat-typechain.html): a plugin that generates typings files for use in test files and possibly even on the front-end.
- [solidity-coverage](https://hardhat.org/plugins/solidity-coverage.html): a plugin that generates a coverage report on how much of your code has been tested.
  - `npx hardhat coverage`

The deploy script and test files have been modified to work in a way that takes full advantage of the features which `hardhat-deploy` offers.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You just need to have npm to use this project.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Clone the repo

```sh
git clone https://github.com/pi0neerpat/treasure-chess.git
```

Move into this directory and install packages

```
cd contracts/
yarn install
```

## Usage

To run tests, first compile the project with `yarn compile` and then `yarn test`. If you would like to deploy your project, use `yarn deploy --network <NETWORK>`. Keep in mind, you must add this network to the `hardhat.config.ts` file with the necessary information for this to work.

### User functions

#### Owner only minting

```js
mint(
    address player,
    string memory tokenURI,
    bytes32 _moveHash,
    uint8 _level,
    uint16 _achievement1,
    uint16 _achievement2,
    uint16 _achievement3,
    bool _color
  ) public onlyAdmin returns (uint256)
```

## public user functions

### Market

- function listItem(uint \_id, uint price, uint duration) public
- function cancelSale(uint \_id) public
- function instantBuy( uint \_id ) public **payable**

### transfers

- function safeTransferFrom( address from, address to, uint256 tokenId)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

TODO

## Acknowledgements

- [Hardhat](https://hardhat.org)
- [Paul R Berg Solidity Template](https://github.com/paulrberg/solidity-template)
- [0xDanvinci upgraded hardhat template](https://github.com/0xDavinci)
