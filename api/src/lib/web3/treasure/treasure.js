import {
  getIdFromNetworkName,
  getProviderByChainId,
} from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import treasureArtifact from '@treasure-chess/treasure-contracts/artifacts/contracts/Treasure.sol/Treasure.json'
import { adminSendTransaction } from 'src/lib/web3/admin'

const treasureAbi = treasureArtifact.abi
const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)

export const mint = async ({ treasure, tokenUri, minterAddress }) => {
  const treasureContract = getTreasureContract()
  const chievs = treasure.achievements.split(',')
  const [achieve1, achieve2, achieve3] = [0, 1, 2].map((index) => {
    try {
      return Number(chievs[index].split('.')[0].replace('#', ''))
    } catch {
      return 0
    }
  })

  const unsignedTx = await treasureContract.populateTransaction.mint(
    minterAddress, // address player
    tokenUri, // string memory tokenURI
    treasure.id, //bytes32 moveHash
    treasure.achievementScore, // uint8 _level
    achieve1, // uint16 _achievement1
    achieve2, // uint16 _achievement2
    achieve3, // uint16 _achievement3
    treasure.cardColor // bool _color
  )
  const tx = await adminSendTransaction(unsignedTx, CHAIN_ID)
  return tx
}

export const getTreasureContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_TREASURE,
      treasureAbi,
      getProviderByChainId(CHAIN_ID)
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(e)
  }
}

export const getERC721Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, treasureAbi, rpcProvider)
  return await contract.balanceOf(userAddress)
}
