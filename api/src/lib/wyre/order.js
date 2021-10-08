import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { mintTreasure } from 'src/lib/web3'
import { fetchOrder, parseReferenceId } from 'src/lib/wyre/wyre'
import { db } from 'src/lib/db'

const validateMintOrder = (order) => {
  try {
    if (order.status !== 'COMPLETE') throw 'status not COMPLETE'
    if (order.sourceCurrency !== 'USD') throw 'sourceCurrency is not USD'
    if (order.destCurrency !== 'USD') throw 'destCurrency is not USD'
    // TODO: Check if this is still valid we finalize the fee amount with Wyre
    if (order.usdSourceAmount != process.env.WYRE_MINT_USD_SOURCE_AMOUNT)
      throw `usdSourceAmount is not ${process.env.WYRE_MINT_USD_SOURCE_AMOUNT}`

    if (order.usdPurchaseAmount != process.env.WYRE_MINT_USD_PURCHASE_AMOUNT)
      throw `usdPurchaseAmount is not ${process.env.WYRE_MINT_USD_PURCHASE_AMOUNT}`
    const destString = `account:${process.env.WYRE_ACCOUNT_ID_TREASURE}`
    if (order.dest !== destString) throw `dest is not ${destString}`
  } catch (e) {
    throw Error(
      `Wyre mint order invalid: order.${e} . Received: ${JSON.stringify(order)}`
    )
  }
}

const validateReferenceId = async (referenceId) => {
  const { username, gameId, endTime, address, title } =
    parseReferenceId(referenceId)

  const member = await fetchMember(username)
  if (!member)
    throw Error(`Member "${username}" could not be found in the Chess API`)
  if (!member.address)
    throw Error(`Member ${username} does not have an address.`)
  const memberAddress = member.address.toLowerCase()
  const refereceIdAddress = address.toLowerCase()
  if (memberAddress !== refereceIdAddress)
    throw Error(
      `Member address for ${username} "${memberAddress}" does not match referenceId address "${refereceIdAddress}"`
    )

  const game = await fetchGame({ id: gameId, endTime, username })
  if (!game)
    throw Error(
      `Game "${gameId}" played by ${username} at ${endTime} could not be found in the Chess API`
    )
  return { member, game, title }
}

export const processOrder = async ({ orderId, referenceId }) => {
  try {
    const order = await fetchOrder(orderId)
    validateMintOrder(order)
    console.log(order)
    // TODO: WARNING using the referenceId from the webook is unsecure. Waiting for
    // Wyre to add it to the /orders endpoint
    const { member, game, title } = await validateReferenceId(referenceId)
    const mintPurchaseData = {
      id: orderId,
      orderStatus: 'COMPLETE',
      gameId: game.id,
      gameEndTime: game.endTime,
      member: { connect: { id: member.id } },
    }
    const mintPurchase = await db.mintPurchase.upsert({
      where: { id: orderId },
      create: mintPurchaseData,
      update: mintPurchaseData,
    })

    await mintTreasure({ game, mintPurchase, member, title })
  } catch (e) {
    // The api/checkout endpoint shouldn't return any specific errors, so
    // we need to track these with our own logging
    console.log(orderId, referenceId)
    console.log(e)
  }
}
