const treasureArtifact = require('@treasure-chess/treasure-contracts/artifacts/contracts/Treasure.sol/Treasure.json')
import { Contract } from '@ethersproject/contracts'

import achievementsList from '@treasure-chess/chess-achievements/src/achievementsList'

import { adminSendTransaction } from 'src/lib/web3/admin'
import { web3Provider } from 'src/lib/web3/helpers'
import { memberSendTransaction } from 'src/lib/web3/member'

const treasureAbi = treasureArtifact.abi

export const getTreasureContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_TREASURE,
      treasureAbi,
      web3Provider
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(e)
  }
}

export const mint = async ({ treasure, tokenUri, minterAddress }) => {
  try {
    if (!minterAddress) throw 'No minterAddress provided'
    if (!tokenUri) throw 'No tokenUri provided'
    if (!treasure) throw 'No treasure provided'

    const treasureContract = getTreasureContract()

    // Lookup the number of each achievement
    let chievScore = [0, 0, 0]
    treasure.achievements.map((chiev, index) => {
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
    const tx = await adminSendTransaction(unsignedTx)
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

export const getERC721Balance = async ({ contractAddress, userAddress }) => {
  const contract = new Contract(contractAddress, treasureAbi, web3Provider)
  return await contract.balanceOf(userAddress)
}

export const totalSupply = async () => {
  const treasureContract = getTreasureContract()
  const supply = await treasureContract.getTotalGames()
  return supply.toString()
}

export const checkAndSetMarketApproval = async ({ member }) => {
  try {
    const treasureContract = getTreasureContract()
    const isApprovedForAll = await treasureContract.isApprovedForAll(
      member.address,
      process.env.CONTRACT_ADDRESS_TREASURE_MARKET
    )
    if (!isApprovedForAll) {
      const unsignedTx =
        await treasureContract.populateTransaction.setApprovalForAll(
          process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
          true
        )
      const tx = await memberSendTransaction({
        memberId: member.id,
        unsignedTx,
      })
      return tx
    }
    return null
  } catch (e) {
    throw new Error(`checkAndSetMarketApproval() ${e}`)
  }
}
