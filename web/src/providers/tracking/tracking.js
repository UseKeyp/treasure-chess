import * as Sentry from '@sentry/browser'
import { useAuth } from '@redwoodjs/auth'

const TrackingProvider = () => {
  const { currentUser } = useAuth()
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.ENVIRONMENT,
      // beforeSend(event) {
      // Check if it is an exception, and if so, show the report dialog
      // if (event.exception) {
      //   Sentry.showReportDialog({ eventId: event.event_id })
      // }
      //   return event
      // },
    })
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log(e)
  }
  React.useEffect(() => {
    if (!currentUser) return
    /* eslint-disable no-undef */
    // Matomo
    _paq.push(['setUserId', currentUser.username])
    // Mautic
    mt(
      'send',
      'pageview',
      {},
      {
        onload: () => {
          mt('send', 'pageview', {
            username: currentUser.username,
            chessId: currentUser.id,
          })
        },
        onerror: () => {},
      }
    )
    /* eslint-enable no-undef */
    Sentry.setUser(currentUser)
  }, [currentUser])

  // Hide chat bubble except on support page
  React.useEffect(() => {
    console.log(window.$chatwoot)
    if (!window.$chatwoot?.hasLoaded) return
    window.$chatwoot?.toggleBubbleVisibility('hide')
  }, [window.$chatwoot.hasLoaded])

  return null
}
export { TrackingProvider }
