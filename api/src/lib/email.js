import { createTransport } from 'nodemailer'

import { logger } from 'src/lib/logger'

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

export const sendEmail = async ({ type, member, treasure }) => {
  //
  const mail = await transport.sendMail({})
}
