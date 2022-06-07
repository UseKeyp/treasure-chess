import { EnvelopError } from '@envelop/core'

import { createDepositReservation } from 'src/lib/wyre'
import { encodeBody } from 'src/lib/oAuth/helpers'
import { logger } from 'src/lib/logger'
import { memberSignMesage } from 'src/lib/web3/wallets'
const MT_PELERIN = 'MT_PELERIN'
const WYRE = 'WYRE'
const RAMP_NETWORK = 'RAMP_NETWORK'
export const RAMP_DEPOSIT_TYPES_ENABLED = [MT_PELERIN, WYRE, RAMP_NETWORK]

export const getRampOffUrl = async ({ _type }) => {
  // let url
  // const address = context.currentUser.address
  // if (type === WYRE) {
  // }
  // return url
}

export const getRampOnUrl = async ({ type }) => {
  try {
    if (!RAMP_DEPOSIT_TYPES_ENABLED.includes(type))
      throw new EnvelopError(`Ramp type "${type}" is not supported.`)
    let url
    const address = context.currentUser.address
    if (type === MT_PELERIN) {
      const code = Math.floor(Math.random() * 9999)
      const message = `MtPelerin-${code}`
      const signature = await memberSignMesage({
        memberId: context.currentUser.id,
        message,
      })
      const hash = Buffer.from(signature.replace('0x', ''), 'hex').toString(
        'base64'
      )
      url =
        'https://buy.mtpelerin.com/?' +
        encodeBody({
          type: 'web',
          net: 'matic_mainnet',
          nets: 'matic_mainnet',
          bdc: 'USDC',
          crys: 'USDC',
          tabs: 'buy',
          mylogo: 'https://treasure.chess.com/logo.png',
          primary: '#47433f',
          success: '#0096c6',
          // TODO:  add referral code
          // rfr:""
          addr: address,
          code,
          hash,
        })
    } else if (type === RAMP_NETWORK) {
      url =
        'https://buy.ramp.network/?' +
        encodeBody({
          userAddress: address,
          hostLogoUrl: 'https://treasure.chess.com/logo.png',
          hostAppName: 'Treasure Chess',
          // swapAsset: 'MATIC_USDC',
          finalUrl: process.env.APP_DOMAIN + '/redirect/ramp_network',
          // Use for testing
          //'https://ri-widget-staging.firebaseapp.com/',
        })
    } else if (type === WYRE) {
      ;({ url } = await createDepositReservation(address))
    }

    // TODO:  implement database update
    // const { url, reservation, paymentMethod, destCurrency } =
    //   await createDepositReservation(context.currentUser.address)
    // try {
    //   await db.depositOrder.create({
    //     data: {
    //       paymentType: 'WYRE',
    //       paymentMethod,
    //       reservation,
    //       destCurrency,
    //       member: { connect: { id: context.currentUser.id } },
    //     },
    //   })
    // } catch (e) {
    //   logger.error(e)
    //   // Do nothing
    // }

    return { url }
  } catch (e) {
    // TODO: Better logging for why tx submission failed
    logger.error(e)
    throw new Error('getRampOnUrl() ', e)
  }
}
