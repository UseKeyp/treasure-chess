import { web3Provider, DEFAULT_GAS_PRICE } from 'src/lib/web3/helpers'
import { Contract } from '@ethersproject/contracts'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { EnvelopError } from '@envelop/core'
import { logger } from 'src/lib/logger'
import { checkGasAndAirdrop } from 'src/lib/web3/airdrop'
import { memberSendTransaction } from 'src/lib/web3/member'

export const getTokenContract = () => {
  try {
    return new Contract(
      process.env.CONTRACT_ADDRESS_PAYMENT_TOKEN,
      [
        'function balanceOf(address) external view returns (uint256)',
        'function allowance(address, address) external view returns (uint256)',
        'function approve(address, uint256) external returns (bool)',
        'function transfer(address, uint256) external returns (bool)',
      ],
      web3Provider
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

export const getUsdcBalance = async (address) => {
  if (!address) throw 'No address provided'
  let contract
  try {
    contract = getTokenContract()
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get USDC balance')
  }

  try {
    const bal = await contract.balanceOf(address)
    return formatUnits(bal, process.env.DECIMALS_PAYMENT_TOKEN)
  } catch (e) {
    logger.error(e)
    throw new EnvelopError('Unable to get USDC balance')
  }
}

// NOTE: amount is in whole dollars
export const transferUsdc = async ({ to, amount }) => {
  if (!to) throw 'No to address provided'
  let contract
  try {
    const gettingGas = await checkGasAndAirdrop({ member: context.currentUser })
    if (gettingGas)
      throw "Try again in a few minutes, we're sending some gas to your wallet."

    contract = getTokenContract()
    const bal = await contract.balanceOf(context.currentUser.address)

    const amountBn = parseUnits(amount, process.env.DECIMALS_PAYMENT_TOKEN)
    const balance = formatUnits(bal, process.env.DECIMALS_PAYMENT_TOKEN)
    if (bal.lt(amountBn))
      throw `Amount exceeds your current balance of $${
        Number(balance) > 0
          ? Number(balance).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : 0
      }`

    const unsignedTx = await contract.populateTransaction.transfer(
      to,
      amountBn,
      {
        gasPrice: DEFAULT_GAS_PRICE,
      }
    )
    const tx = await memberSendTransaction({
      memberId: context.currentUser.id,
      unsignedTx,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new EnvelopError(`Error transferring USDC - ${e?.message || e}`)
  }
}
