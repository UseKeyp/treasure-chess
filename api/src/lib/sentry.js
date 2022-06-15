import * as Sentry from '@sentry/node'
import '@sentry/tracing';
/* eslint-disable-next-line no-unused-vars */
import * as Tracing from '@sentry/tracing'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.5,
  environment: process.env.ENVIRONMENT,
})

export default Sentry
