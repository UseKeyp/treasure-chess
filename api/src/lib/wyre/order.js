import Sentry from 'src/lib/sentry'
import { fetchGame } from 'src/lib/games'
import { mintTreasure } from 'src/lib/web3'
import { fetchOrder } from 'src/lib/wyre/wyre'
import { db } from 'src/lib/db'
import { sendDiscordAlert } from 'src/lib/discord/discord'
import { isProduction } from 'src/lib/helpers'

const DISCORD_WYRE_DASHBOARD_URL = isProduction
  ? 'https://www.wyre.com/#/dashboard'
  : 'https://www.testwyre.com/#/dashboard'
const DISCORD_PRODUCTION_TITLE = isProduction ? '[prod]' : '[dev]'

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

export const processOrder = async ({ reservation, orderId }) => {
  try {
    let mintPurchase = await db.mintPurchase.findUnique({
      where: { orderId },
    })
    // Ensure orderId hasn't already used with a different reservation
    if (mintPurchase && mintPurchase.reservation !== reservation)
      throw Error(
        `Wyre mint order invalid. orderId ${orderId} / reservation ${reservation} has already been used with reservation ${mintPurchase.reservation} and purchase #${mintPurchase.id}`
      )
    const order = await fetchOrder(orderId)
    validateMintOrder(order)
    mintPurchase = await db.mintPurchase.findUnique({
      where: { reservation },
    })
    if (!mintPurchase)
      throw new Error(
        `MintPurchase not found for reservation: ${reservation} orderId: ${orderId}`
      )
    const { memberId, gameId, gameEndTime, title } = mintPurchase
    const member = await db.member.findUnique({ where: { id: memberId } })
    Sentry.setUser({ username: member.username })
    const game = await fetchGame({
      id: gameId,
      username: member.username,
      endTime: gameEndTime,
      includeTreasureData: true,
    })
    await db.mintPurchase.update({
      where: { id: mintPurchase.id },
      data: {
        orderId,
        orderStatus: 'COMPLETE',
      },
    })
    await mintTreasure({ game, mintPurchase, member, title })
  } catch (e) {
    /* eslint-disable-next-line no-console */
    await sendDiscordAlert({
      embed: {
        color: 16740982,
        title: `${DISCORD_PRODUCTION_TITLE}  ⛈️  Mint Order Failed!`,
        description: `Order ID: ${orderId}

${e}

[Wyre Dashboard](${DISCORD_WYRE_DASHBOARD_URL})`,
        footer: {
          text: new Date().toString(),
        },
        type: 'link',
      },
    })
    Sentry.captureException(e)
  }
}

// TODO: Delete if still not used after Wyre adds referenceId to webhook
// const validateReferenceId = async (referenceId) => {
//   const { username, gameId, endTime, address, title } =
//     parseReferenceId(referenceId)
//   Sentry.setUser({ username })
//
//   const member = await fetchMember(username)
//   if (!member)
//     throw Error(`Member "${username}" could not be found in the Chess API`)
//   if (!member.address)
//     throw Error(`Member ${username} does not have an address.`)
//   const memberAddress = member.address.toLowerCase()
//   const refereceIdAddress = address.toLowerCase()
//   if (memberAddress !== refereceIdAddress)
//     throw Error(
//       `Member address for ${username} "${memberAddress}" does not match referenceId address "${refereceIdAddress}"`
//     )
//
//   const game = await fetchGame({
//     id: gameId,
//     username,
//     endTime,
//     includeTreasureData: true,
//   })
//   const endTimeString = new Date(endTime * 1000)
//   if (!game)
//     throw Error(
//       `Game "${gameId}" played by ${username} at ${endTimeString} could not be found in the Chess API`
//     )
//   // TODO: trigger another mint transaction if the last one failed?
//   if (game.mintPurchaseId)
//     throw Error(
//       `Game "${gameId}" played by ${username} at ${endTimeString} minting process has already started/completed. Token ID: ${game.tokenId}`
//     )
//   if (game.blackUsername !== username && game.whiteUsername !== username)
//     throw Error(
//       `Game "${gameId}" at ${endTimeString} was not played by ${username}. Black: ${game.blackUsername}, White: ${game.whiteUsername}.`
//     )
//   return { member, game, title }
// }
