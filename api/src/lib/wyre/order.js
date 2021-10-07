import { fetchMember } from 'src/lib/members'
import { fetchGame } from 'src/lib/games'
import { db } from 'src/lib/db'

const validateMintOrder = (order) => {
  try {
    if (order.status !== 'COMPLETE') throw Error('status not COMPLETE')
    if (order.sourceCurrency !== 'USD') throw Error('sourceCurrency is not USD')
    if (order.destCurrency !== 'USD') throw Error('destCurrency is not USD')
    // TODO: Check if this is still valid we finalize the fee amount with Wyre
    if (order.usdSourceAmount !== process.env.WYRE_MINT_USD_SOURCE_AMOUNT)
      throw Error(
        `usdSourceAmount is not ${process.env.WYRE_MINT_USD_SOURCE_AMOUNT}`
      )
    if (order.usdPurchaseAmount !== process.env.WYRE_MINT_USD_PURCHASE_AMOUNT)
      throw Error(
        `usdPurchaseAmount is not ${process.env.WYRE_MINT_USD_PURCHASE_AMOUNT}`
      )
    if (order.dest !== process.env.WYRE_ACCOUNT_ID_TREASURE)
      throw Error(`dest is not account ${process.env.WYRE_ACCOUNT_ID_TREASURE}`)
  } catch (e) {
    throw Error(`Wyre mint order is invalid: order.${e}`)
  }
}

const validateReferenceId = async (referenceId) => {
  const { username, gameId, endTime, address } = parseReferenceId(referenceId)

  const member = await fetchMember(username)
  if (!member)
    throw Error(`Member "${username}" could not be found in the Chess API`)
  const memberAddress = member.address.toLowercase()
  const refereceIdAddress = address.toLowercase()
  if (memberAddress !== refereceIdAddress)
    throw Error(
      `Member address for ${username} "${memberAddress}" does not match referenceId address "${refereceIdAddress}"`
    )

  const game = await fetchGame({ id: gameId, endTime, username })
  if (!game)
    throw Error(
      `Game "${gameId}" played by ${username} at ${endTime} could not be found in the Chess API`
    )
  return { member, game }
}

export const processOrder = async ({ orderId, referenceId }) => {
  try {
    const order = await fetchOrder(orderId)
    validateMintOrder(order)

    // TODO: WARNING using the referenceId from the webook is unsecure. Waiting for
    // Wyre to add it to the /orders endpoint
    const { member, game } = await validateReferenceId(referenceId)

    const mintPurchase = await db.mintPurchase.create({
      id: orderId,
      orderStatus: 'COMPLETE',
      gameId: game.id,
      gameEndTime: game.endTime,
      member: { connect: { id: member.id } },
    })

    // TODO: Trigger minting process
  } catch (e) {
    // The api/checkout endpoint shouldn't return any specific errors, so
    // we need to track these with our own logging
    console.log(orderId, referenceId)
    console.log(e)
  }
}
