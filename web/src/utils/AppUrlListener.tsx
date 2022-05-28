// Capacitor
import React, { useEffect } from 'react'
import { navigate } from '@redwoodjs/router'
import { App, URLOpenListenerEvent } from '@capacitor/app'

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl()

  console.log('App opened with URL: ' + url)
}
import { Device } from '@capacitor/device'

App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
  // Example url: https://beerswift.app/tabs/tab2
  // slug = /tabs/tab2
  console.log('appUrlOpen event')
  const slug = event.url.split('.app').pop()
  if (slug) {
    let url = new URL(slug)
    let pathandQuery = url.pathname + url.search
    console.log(pathandQuery)
    navigate(pathandQuery)
    window.location.reload() // Required to trigger the useEffect
  }
})
App.addListener('appStateChange', (event) => {
  console.log('appStateChange:', JSON.stringify(event))
})
const AppUrlListener: React.FC<any> = () => {
  useEffect(() => {
    checkAppLaunchUrl()
  }, [])

  return null
}

export default AppUrlListener
