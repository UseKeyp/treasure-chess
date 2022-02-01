const treasureMerketArtifact = require('@treasure-chess/treasure-contracts/artifacts/contracts/TreasureMarket.sol/TreasureMarket.json')
import { Contract } from '@ethersproject/contracts'
import { memberSendTransaction } from 'src/lib/web3/member'
import { parseUnits } from '@ethersproject/units'
import { web3Provider } from 'src/lib/web3/helpers'
import { checkAndSetMarketApproval } from 'src/lib/web3/treasure'

export const getTreasureMarketContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
      treasureMerketArtifact.abi,
      web3Provider
    )
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(`getTreasureMarketContract() ${e}`)
  }
}

export const list = async ({ treasure, amount }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApproval({ member: treasure.owner })

    const treasureMarketContract = getTreasureMarketContract()
    const unsignedTx =
      // TODO: replace when new contracts are deployed
      // await treasureMarketContract.populateTransaction.tokenListItem(
      await treasureMarketContract.populateTransaction.tokenListIten(
        treasure.tokenId,
        parseUnits(amount.toString(), process.env.DECIMALS_PAYMENT_TOKEN),
        process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(`list() ${e}`)
  }
}

export const unlist = async ({ treasure }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApproval({ member: treasure.owner })

    const treasureMarketContract = getTreasureMarketContract()
    const unsignedTx =
      // TODO: Change with new contract deployment
      // await treasureMarketContract.populateTransaction.tokenUnlistItem(
      await treasureMarketContract.populateTransaction.tokenCancelSale(
        treasure.tokenId
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(`unlist() ${e}`)
  }
}

export const buy = async ({ treasure }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApproval({ member: treasure.owner })

    const treasureMarketContract = getTreasureMarketContract()
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenInstantBuy(
        treasure.tokenId,
        process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
    throw new Error(`buy() ${e}`)
  }
}
