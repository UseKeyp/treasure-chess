import {
  getIdFromNetworkName,
  getProviderByChainId,
} from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import treasureAbi from './treasureAbi'
import { adminSendTransaction } from 'src/lib/web3/admin'

const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)

export const mint = async ({ treasure, tokenUri }) => {
  const treasureContract = getTreasureContract()
  console.log(
    treasure.minterAddress, // address player
    tokenUri, // string memory tokenURI
    treasure.id, //bytes32 moveHash
    treasure.achievementScore, // uint8 _level
    treasure.achievements.split(',')[0], // uint16 _achievement1
    treasure.achievements.split(',')[1], // uint16 _achievement1
    treasure.achievements.split(',')[2], // uint16 _achievement1
    treasure.cardColor
  )
  const unsignedTx = await treasureContract.populateTransaction.mint(
    treasure.minterAddress, // address player
    tokenUri, // string memory tokenURI
    treasure.id, //bytes32 moveHash
    treasure.achievementScore, // uint8 _level
    treasure.achievements.split(',')[0], // uint16 _achievement1
    treasure.achievements.split(',')[1], // uint16 _achievement1
    treasure.achievements.split(',')[2], // uint16 _achievement1
    treasure.cardColor // bool _color
  )
  // console.log(unsignedTx)
  // const tx = await adminSendTransaction(unsignedTx, CHAIN_ID)
  return null
  // return tx
}

export const getTreasureContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_TREASURE,
      treasureAbi,
      getProviderByChainId(CHAIN_ID)
    )
  } catch (e) {
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
