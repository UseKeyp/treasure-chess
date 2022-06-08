import { Hop, Chain } from '@hop-protocol/sdk'
import { web3Provider, web3MainnetProvider } from 'src/lib/web3/helpers'

const hop = new Hop('mainnet')
hop.setChainProviders({
  ethereum: web3MainnetProvider,
  polygon: web3Provider,
})

const estimateHopOutput = async ({ amount, memberId }) => {
  const amountBn = parseUnits(amount, process.env.DECIMALS_PAYMENT_TOKEN)
  const bridge = hop.connect(web3Provider).bridge('USDC')

  // get estimated tokens out when sending 100 USDC Polygon -> Gnosis
  const { estimatedReceived } = await bridge.getSendData(
    amountBn,
    Chain.Polygon,
    Chain.Ethereum
  )
  return estimatedReceived.toString()
}

const hopToMainnet = async ({ amount, member }) => {
  const amountBn = parseUnits(amount, process.env.DECIMALS_PAYMENT_TOKEN)

  const bridge = hop.connect(web3Provider).bridge('USDC')

  // const unsignedTx = await bridge.erc20Transfer(
  const spender = await bridge.getSendApprovalAddress(Chain.Polygon)

  // Approve spending ERC20
  const tokenContract = getTokenContract()
  const allowance = await tokenContract.allowance(member.address, spender)
  if (allowance.lt(amountBn)) {
    const unsignedApprovalTx = await tokenContract.populateTransaction.approve(
      spender,
      amountBn
    )
    tokenApprovalTx = await memberSendTransaction({
      memberId: member.id,
      unsignedTx: unsignedApprovalTx,
    })
  }
  const unsignedHopTx = await bridge.populateSendTx(
    amountBn,
    Chain.Polygon,
    Chain.Ethereum
  )
  await memberSendTransaction({ memberId, unsignedTx: unsignedHopTx })
}
