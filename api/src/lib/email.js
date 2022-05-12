import { createTransport } from 'nodemailer'

import { logger } from 'src/lib/logger'

// --

const EMAIL_FROM = ''

// --

const transport = createTransport({
  logger,
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// --

/**
 * @example
 * // Provide `body` and `subject` directly
 *
 * import { sendEmail } from 'src/lib/email'
 *
 * sendEmail({
 *   member,
 *   treasure,
 *   subject: 'hello world',
 *   body: 'foo bar, lorem ipsum',
 * })
 *
 * // via a template
 *
 * import { sendEmail, WYRE_DEPOSIT_SUCCESS } from 'src/lib/email'
 *
 * sendEmail({ member, treasure, ...WYRE_DEPOSIT_SUCCESS({ ... }) })
 */
export const sendEmail = async ({ body, member, subject, treasure: _t }) => {
  //
  const { email } = member

  // --

  const _mail = await transport.sendMail({
    from: EMAIL_FROM,
    subject,
    text: body,
    to: email,
  })
}

// --

export const EXTERNAL_TRANSFER_CONFIRMATION = ({
  amount,
  externalAddress,
  txReceipt,
}) => {
  //
  if (!amount) throw new Error('Missing MUSDC transfer amount.')
  if (!externalAddress) throw new Error('Missing external address.')
  if (!txReceipt) throw new Error('Missing blockchain transaction receipt.')

  // --

  return {
    subject: 'You initiated a MUSDC transfer',
    body: `You just transferred $${amount} MUSDC to an external address [${externalAddress}](https://polygonscan.com/address/${externalAddress}). Here's the blockchain transaction receipt: [${txReceipt}](https://polygonscan.com/tx/${txReceipt})`,
  }
}

export const WYRE_DEPOSIT_SUCCESS = ({ amount }) => {
  //
  if (!amount) throw new Error('Missing amount of funds added.')

  // --

  return {
    subject: 'Funds added successfully!',
    body: `You just added $${amount} to your Treasure Chess account using Wyre. View your [profile](https://treasure.chess.com/profile) to see your current balance.`,
  }
}

export const PLAID_CONNECT_SUCCESS = () => {
  //
  return {
    subject: 'Cash Out is now enabled',
    body: 'You just connected your bank using Plaid + Wyre. You can now cash out funds at any time. Funds typically take a few days to appear in your account.',
  }
}

export const WYRE_WITHDRAW_SUCCESS = ({ amount, txReceipt }) => {
  //
  if (!amount) throw new Error('Missing cash out amount.')
  if (!txReceipt) throw new Error('Missing blockchain transaction receipt.')

  // --

  return {
    subject: 'Cash Out request submitted!',
    body: `You just initiated a Cash Out for $${amount} to your bank using Plaid + Wyre. Here's the blockchain transaction receipt: [${txReceipt}](https://polygonscan.com/tx/${txReceipt}). Funds typically take a few days to appear in your account.`,
  }
}

export const MINT_SUCCESS_NEWUSER = ({ title, tokenId }) => {
  //
  if (!title) throw new Error('Missing treasure title.')
  if (!tokenId) throw new Error('Missing treasure tokenId.')

  // --

  return {
    subject: 'You minted your first Treasure!',
    body: `Your Treasure looks super cool! Check it out here: [${title}](https://treasure.chess.com/treasures/${tokenId})`,
  }
}

export const TREASURE_MARKET_SALE_SELLER = ({
  amountEarned,
  amountSold,
  title,
  tokenId,
  txReceipt,
  username,
}) => {
  //
  if (!amountEarned) throw new Error('Missing amount earned.')
  if (!amountSold) throw new Error('Missing amount sold.')
  if (!title) throw new Error('Missing treasure title.')
  if (!tokenId) throw new Error('Missing treasure tokenId.')
  if (!txReceipt) throw new Error('Missing blockchain transaction receipt.')
  if (!username) throw new Error("Missing purchaser's username.")

  // --

  return {
    subject: `Treasure "${title}" sold for $${amountSold}`,
    body: `Congrats! Treasure "[${title}](https://treasure.chess.com/treasures/${tokenId})" was bought by [${username}](https://treasure.chess.com/members/${username}) for $${amountSold}. You earned $${amountEarned}. Here's the blockchain transaction receipt: [${txReceipt}](https://polygonscan.com/tx/${txReceipt})`,
  }
}

export const TREASURE_MARKET_SALE_BUYER = ({
  amountBought,
  amountEarned,
  title,
  tokenId,
  txReceipt,
  username,
}) => {
  //
  if (!amountBought) throw new Error('Missing amount bought.')
  if (!amountEarned) throw new Error('Missing amount earned.')
  if (!title) throw new Error('Missing treasure title.')
  if (!tokenId) throw new Error('Missing treasure tokenId.')
  if (!txReceipt) throw new Error('Missing blockchain transaction receipt.')
  if (!username) throw new Error("Missing seller's username.")

  // --

  return {
    subject: `Treasure "${title}" purchased`,
    body: `You just purchased Treasure "[${title}](https://treasure.chess.com/treasures/${tokenId})" for $${amountBought}. The seller [${username}](https://treasure.chess.com/members/${username}) earned $${amountEarned}. Here's the blockchain transaction receipt: [${txReceipt}](https://polygonscan.com/tx/${txReceipt})`,
  }
}
