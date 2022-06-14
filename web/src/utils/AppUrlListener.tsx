import { navigate } from '@redwoodjs/router'
import { App, URLOpenListenerEvent } from '@capacitor/app'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

// const checkAppLaunchUrl = async () => {
// const { url } = await App.getLaunchUrl()
// console.log('App opened with URL: ' + url)
// }

isBrowser &&
  App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
    // Example url: https://beerswift.app/tabs/tab2
    // slug = /tabs/tab2
    // console.log('appUrlOpen event')
    const slug = event.url.split('.app').pop()
    if (slug) {
      const url = new URL(slug)
      const pathandQuery = url.pathname + url.search
      // console.log(pathandQuery)
      navigate(pathandQuery)
      window.location.reload() // Required to trigger the useEffect
    }
  })
// App.addListener('appStateChange', (event) => {
//   console.log('appStateChange:', JSON.stringify(event))
// })
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const AppUrlListener: React.FC<any> = () => {
  // React.useEffect(() => {
  // checkAppLaunchUrl()
  // }, [])

  return null
}

export default AppUrlListener
