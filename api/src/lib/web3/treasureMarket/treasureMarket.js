const treasureMerketArtifact = require('@treasure-chess/treasure-contracts/artifacts/contracts/TreasureMarket.sol/TreasureMarket.json')
import { Contract } from '@ethersproject/contracts'
import { memberSendTransaction } from 'src/lib/web3/member'
import { parseUnits } from '@ethersproject/units'
import {
  web3Provider,
  DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
  DEFAULT_GAS_MAX_FEE_PER_GAS,
} from 'src/lib/web3/helpers'
import { getTreasureContract } from 'src/lib/web3/treasure'
import { getTokenContract } from 'src/lib/web3/tokens'

import { logger } from 'src/lib/logger'

export const getTreasureMarketContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
      treasureMerketArtifact.abi,
      web3Provider
    )
  } catch (e) {
    logger.error(e)
    throw new Error(`getTreasureMarketContract() ${e}`)
  }
}

export const checkAndSetMarketApprovals = async ({ member }) => {
  try {
    let treasureApprovalTx
    let tokenApprovalTx
    // Approve spending Treasure
    const treasureContract = getTreasureContract()
    const isApprovedForAllTreasures = await treasureContract.isApprovedForAll(
      member.address,
      process.env.CONTRACT_ADDRESS_TREASURE_MARKET
    )
    if (!isApprovedForAllTreasures) {
      const unsignedTx =
        await treasureContract.populateTransaction.setApprovalForAll(
          process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
          true,
          {
            maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
            maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
          }
        )
      treasureApprovalTx = await memberSendTransaction({
        memberId: member.id,
        unsignedTx,
      })
    }
    // Approve spending ERC20
    const tokenContract = getTokenContract()
    const allowance = await tokenContract.allowance(
      member.address,
      process.env.CONTRACT_ADDRESS_TREASURE_MARKET
    )
    const ONE_BILLION_BN = parseUnits('1000000000', 18)
    if (allowance.lt(ONE_BILLION_BN)) {
      const unsignedTx = await tokenContract.populateTransaction.approve(
        process.env.CONTRACT_ADDRESS_TREASURE_MARKET,
        ONE_BILLION_BN,
        {
          maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
          maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
        }
      )
      tokenApprovalTx = await memberSendTransaction({
        memberId: member.id,
        unsignedTx,
      })
    }
    return { tokenApprovalTx, treasureApprovalTx }
  } catch (e) {
    logger.error(e)
    throw new Error(`checkAndSetMarketApproval() ${e}`)
  }
}

export const list = async ({ treasure, amount }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApprovals({ member: treasure.owner })

    const treasureMarketContract = getTreasureMarketContract()
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenListItem(
        treasure.tokenId,
        parseUnits(amount.toString(), process.env.DECIMALS_PAYMENT_TOKEN),
        process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
        {
          maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
          maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
        }
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new Error(`list() ${e}`)
  }
}

export const unlist = async ({ treasure }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApprovals({ member: treasure.owner })

    const treasureMarketContract = getTreasureMarketContract()
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenUnlistItem(
        treasure.tokenId,
        {
          maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
          maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
        }
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new Error(`unlist() ${e}`)
  }
}

export const buy = async ({ treasure }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApprovals({ member: context.currentUser })

    const treasureMarketContract = getTreasureMarketContract()
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenInstantBuy(
        treasure.tokenId,
        process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
        {
          maxPriorityFeePerGas: DEFAULT_GAS_MAX_PRIORITY_FEE_PER_GAS,
          maxFeePerGas: DEFAULT_GAS_MAX_FEE_PER_GAS,
        }
      )
    const tx = await memberSendTransaction({
      memberId: context.currentUser.id,
      unsignedTx,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new Error(`buy() ${e}`)
  }
}
