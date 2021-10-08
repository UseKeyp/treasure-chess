# Smart Contracts

## 🌞 Production

Copy the most recent version of the contract ABIs to the appropriate `api/` directory by running this command in the root of the repo:

```bash
yarn compile-abi
```

## Usage

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

### public user functions

#### Market

```js
function listItem(uint \_id, uint price, uint duration) public

function cancelSale(uint \_id) public

function instantBuy( uint \_id ) public // **payable**
```

#### Transfers

- function safeTransferFrom( address from, address to, uint256 tokenId)

#### Meta transactions

Make meta transaction calls calling the functions normally, and getting end user to sign them normally. The web3 provider that is created knows where the paymaster + [relayer contracts are deployed](https://docs.opengsn.org/contracts/addresses.html#polygon-matic), and actually sends the transaction through the relayer instead of straight to the Treasure or Treasure Market smart contracts.

GSN example: https://docs.opengsn.org/javascript-client/getting-started.html#adding-gsn-support-to-existing-app

Example tests of GSN enabled contract: https://github.com/qbzzt/opengsn/blob/master/01_SimpleUse/test/testcontracts.js

Example JS in UI for GSN transactions: https://github.com/qbzzt/opengsn/blob/master/01_SimpleUse/ui/etherless.js

Use the deployed relayer and our Paymaster. Check above for relayer addresses for each network.

```js
import { RelayProvider } from '@opengsn/provider'
import Treasure from '/path/to/artifact'
import PayMaster from '/path/to/artifact'
import TreasureMarket from '/path/to/artifact'

const conf = {
  Treasure: '0xabc123',
  TreasureMarket: '0x1a2b3c',
  paymaster: '0x123abc',
  gasPrice: 1000000000, // 1 Gwei
}

const web3Provider = window.ethereum // Change for node-js environment

const gsnProvider = new gsn.RelayProvider(web3Provider, {
  forwarderAddress: conf.forwarder, // Needs clarification
  paymasterAddress: conf.paymaster,
  verbose: false, // logging
})
await gsnProvider.init()

gsnProvider = new ethers.providers.Web3Provider(gsnProvider)
userAddr = gsnProvider.origProvider.selectedAddress
```

Make a GSN contract call

```js
const gsnContractCall = async () => {
  await connect2Gsn() // Needs clarification
  await provider.ready

  // Using Treasure transferFrom as an example
  const treasureContract = await new ethers.Contract(
    treasureAddress,
    treasureAbi,
    provider.getSigner(userAddr)
  )

  const tx = await treasureContract.transferFrom()
  console.log(`Transaction ${tx.hash} sent`)

  const receipt = await tx.wait()
  console.log(`Mined in block: ${receipt.blockNumber}`)
}
```

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
