import { resolve } from 'path'

import Email from 'email-templates'

import { logger } from 'src/lib/logger'

// --

const EMAIL_FROM = 'no-reply@treasure.chess.com'

const EMAIL_CONFIG = {
  transport: {
    logger,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  },
}

// --

export const sendEmail = async ({ locals, member: { email }, template }) => {
  //
  await new Email(EMAIL_CONFIG).send({
    locals,
    template: resolve(__dirname, '../../../templates', template),
    message: { from: EMAIL_FROM, to: email },
  })
}

// --

export const sendExternalTransferConfirmation = async ({
  amount,
  externalAddress,
  member,
  txReceipt,
}) => {
  //
  if (typeof amount !== 'string')
    throw new Error('Missing MUSDC transfer amount.')

  if (typeof externalAddress !== 'string')
    throw new Error('Missing external address.')

  if (typeof txReceipt !== 'string')
    throw new Error('Missing blockchain transaction receipt.')

  // --

  await sendEmail({
    member,
    locals: { amount, externalAddress, txReceipt },
    template: 'EXTERNAL_TRANSFER_CONFIRMATION',
  })
}

export const sendMintSuccessToNewUser = async ({ member, treasure }) => {
  //
  const { title, tokenId } = treasure

  // --

  if (typeof title !== 'string') throw new Error('Missing treasure title.')

  if (typeof tokenId !== 'string') throw new Error('Missing treasure tokenId.')

  // --

  await sendEmail({
    member,
    locals: { title, tokenId },
    template: 'MINT_SUCCESS_NEWUSER',
  })
}

export const sendPlaidConnectSuccess = async ({ member }) => {
  //
  await sendEmail({
    member,
    template: 'PLAID_CONNECT_SUCCESS',
  })
}

export const sendTreasureMarketSaleToBuyer = async ({
  amountEarned,
  amountSold,
  member,
  sellerUsername,
  treasure,
  txReceipt,
}) => {
  //
  const { title, tokenId } = treasure

  // --

  if (typeof amountEarned !== 'string')
    throw new Error('Missing amount earned.')

  if (typeof amountSold !== 'string') throw new Error('Missing amount sold.')

  if (typeof title !== 'string') throw new Error('Missing treasure title.')

  if (typeof tokenId !== 'string') throw new Error('Missing treasure tokenId.')

  if (typeof txReceipt !== 'string')
    throw new Error('Missing blockchain transaction receipt.')

  if (typeof sellerUsername !== 'string')
    throw new Error("Missing seller's username.")

  // --

  await sendEmail({
    member,
    template: 'TREASURE_MARKET_SALE_BUYER',
    locals: {
      amountEarned,
      amountSold,
      sellerUsername,
      title,
      tokenId,
      txReceipt,
    },
  })
}

export const sendTreasureMarketSaleToSeller = async ({
  amountEarned,
  amountSold,
  buyerUsername,
  member,
  title,
  tokenId,
  txReceipt,
}) => {
  //
  if (typeof amountEarned !== 'string')
    throw new Error('Missing amount earned.')

  if (typeof amountSold !== 'string') throw new Error('Missing amount sold.')

  if (typeof buyerUsername !== 'string')
    throw new Error("Missing buyer's username.")

  if (typeof title !== 'string') throw new Error('Missing treasure title.')

  if (typeof tokenId !== 'string') throw new Error('Missing treasure tokenId.')

  if (typeof txReceipt !== 'string')
    throw new Error('Missing blockchain transaction receipt.')

  // --

  await sendEmail({
    member,
    template: 'TREASURE_MARKET_SALE_SELLER',
    locals: {
      amountEarned,
      amountSold,
      buyerUsername,
      title,
      tokenId,
      txReceipt,
    },
  })
}

export const sendWyreDepositSuccess = async ({ amount, member }) => {
  //
  if (typeof amount !== 'string')
    throw new Error('Missing amount of funds added.')

  // --

  await sendEmail({
    member,
    locals: { amount },
    template: 'WYRE_DEPOSIT_SUCCESS',
  })
}

export const sendWyreWithdrawSuccess = async ({
  amount,
  member,
  txReceipt,
}) => {
  //
  if (typeof amount !== 'string') throw new Error('Missing cash out amount.')

  if (typeof txReceipt !== 'string')
    throw new Error('Missing blockchain transaction receipt.')

  // --

  await sendEmail({
    member,
    locals: { amount, txReceipt },
    template: 'WYRE_WITHDRAW_SUCCESS',
  })
}
