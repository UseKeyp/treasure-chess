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
