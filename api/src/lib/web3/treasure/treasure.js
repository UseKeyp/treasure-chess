import { getProviderByChainId } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import treasureAbi from './treasureAbi'
import { adminSign } from 'src/lib/web3/admin'

const CHAIN_ID = getIdFromNetworkName(process.env.ETHEREUM_NETWORK_NAME)

export const mint = async ({ treasure, tokenUri }) => {
  const treasureContract = getTreasureContract({
    contractAddress: process.env.CONTRACT_ADDRESS_TREASURE,
    chainId: CHAIN_ID,
  })

  const unsignedTx = treasureContract.mint(
    treasure.minterAddress, // address player
    tokenUri, // string memory tokenURI
    treasure.id, //bytes32 moveHash
    treasure.achievementScore, // uint8 _level
    treasure.achievements.split(',')[0], // uint16 _achievement1
    treasure.achievements.split(',')[1], // uint16 _achievement1
    treasure.achievements.split(',')[2], // uint16 _achievement1
    treasure.cardColor // bool _color
  )
  const signedTx = await adminSign(unsignedTx)

  const provider = getProviderByChainId(CHAIN_ID)
  const tx = await provider.sendTransaction(signedTx)

  return tx
}

export const getTreasureContract = ({ contractAddress, chainId }) => {
  try {
    return new Contract(
      contractAddress,
      treasureAbi,
      getProviderByChainId(chainId)
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
