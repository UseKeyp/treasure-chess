import Email from 'email-templates'
import { resolve } from 'path'

import { logger } from 'src/lib/logger'

// --

const EMAIL_FROM = 'no-reply@treasure.chess.com'

const EMAIL_CONFIG = {
  transport: {
    logger,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
}

// --

/**
 * @param {string} template
 * @param {string | string[]} to
 * @param {Record<string, unknown>} locals
 */
export const sendEmail = async (template, to, locals) => {
  //
  await new Email(EMAIL_CONFIG).send({
    locals,
    template: resolve(__dirname, '../../templates', template),
    message: {
      from: EMAIL_FROM,
      to,
    },
  })
}
