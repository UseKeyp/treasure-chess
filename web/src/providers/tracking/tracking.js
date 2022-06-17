import * as Sentry from '@sentry/browser'
import { useAuth } from '@redwoodjs/auth'
import { useLocation } from '@redwoodjs/router'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

const TrackingProvider = () => {
  const { currentUser } = useAuth()
  const { pathname } = useLocation()

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
  // Set chatwoot user

  // Hide chat bubble except on support page
  isBrowser &&
    window.addEventListener('chatwoot:ready', function () {
      let path
      try {
        path = pathname.split('/')[1]
        if (path !== 'support') window.$chatwoot?.toggleBubbleVisibility('hide')
      } catch {
        // Do nothing
      }
    })

  React.useEffect(() => {
    if (!currentUser || !window.$chatwoot?.hasLoaded) return
    try {
      if (isBrowser) {
        window.$chatwoot?.setUser(currentUser.id, {
          name: currentUser.username,
        })
        window.$chatwoot?.setLocale(currentUser.locale)
        window.$chatwoot?.setCustomAttributes({
          ...currentUser,
        })
      }
    } catch {
      // Do nothing
    }
  }, [currentUser])
  /* eslint-disable react-hooks/exhaustive-deps */
  // }, [window.$chatwoot?.hasLoaded, currentUser])

  return null
}
export { TrackingProvider }
