// Capacitor
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { App, URLOpenListenerEvent } from '@capacitor/app'
console.log('AppUrlListener')

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl()

  console.log('App opened with URL: ' + url)
}

const AppUrlListener: React.FC<any> = () => {
  let navigate = useNavigate()
  useEffect(() => {
    checkAppLaunchUrl()
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      // Example url: https://beerswift.app/tabs/tab2
      // slug = /tabs/tab2
      console.log('appUrlOpen event')

      console.log(event)

      const slug = event.url.split('.app').pop()
      if (slug) {
        navigate(slug)
      }
      // If no match, do nothing - let regular routing
      // logic take over
    })
    App.addListener('appStateChange', (event) => {
      console.log('appStateChange:', JSON.stringify(event))
    })
  }, [])

  return null
}

export default AppUrlListener
