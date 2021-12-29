const { getIdFromNetworkName } = require('@treasure-chess/web3-helpers')
const treasureArtifact = require('@treasure-chess/treasure-contracts/artifacts/contracts/Treasure.sol/Treasure.json')
import { getProviderByChainId } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { adminSendTransaction } from 'src/lib/web3/admin'

import achievementsList from '@treasure-chess/chess-achievements/src/achievementsList'

const treasureAbi = treasureArtifact.abi
const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)

export const mint = async ({ treasure, tokenUri, minterAddress }) => {
  try {
    if (!minterAddress) throw 'No minterAddress provided'
    if (!tokenUri) throw 'No tokenUri provided'
    if (!treasure) throw 'No treasure provided'

    const treasureContract = getTreasureContract()

    // Lookup the number of each achievement
    let chievScore = [0, 0, 0]
    treasure.achievements.split(',').map((chiev, index) => {
      const match = achievementsList.find((item) => item.name == chiev)
      if (match) chievScore[index] = match.number
    })

    const unsignedTx = await treasureContract.populateTransaction.mint(
      minterAddress, // address player
      tokenUri, // string memory tokenURI
      treasure.id, //bytes32 moveHash
      treasure.achievementScore, // uint8 _level
      chievScore[0], // uint16 _achievement1
      chievScore[1], // uint16 _achievement2
      chievScore[2], // uint16 _achievement3
      treasure.cardColor === 'black' // bool _color);
    )
    const tx = await adminSendTransaction(unsignedTx, CHAIN_ID)
    return tx
  } catch (e) {
    throw new Error(`mint() ${e}`)
  }
}

export const getTokenIdFromHashId = async (hashId) => {
  try {
    if (!hashId) throw 'No hashId provided'
    const treasureContract = getTreasureContract()
    const tokenId = await treasureContract.movesHashToId(hashId)
    return tokenId
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(`getTokenIdFromHashId() ${e}`)
  }
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
