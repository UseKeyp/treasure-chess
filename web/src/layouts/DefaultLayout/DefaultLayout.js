import Header from 'src/components/Header'

import SiteFooter from 'src/components/SiteFooter'
import {useEffect, useState} from "react"

const DefaultLayout = ({ children }) => {
  let [scrollPosition, setScrollPosition] = useState(0)
  let [scrolled, setScrolled] = useState(false)
  let sessionScrollPosition = sessionStorage.getItem('scrollPosition')

  useEffect(() => {
    if (window.location.pathname === '/') {
      if (!scrolled && parseInt(sessionScrollPosition) > 0) {
        window.scrollTo(0, parseInt(sessionScrollPosition))
      }
    }
    window.addEventListener('scroll', () => {
      if (window.location.pathname === '/') {
        setScrolled(true)
        setScrollPosition(window.scrollY)
        sessionStorage.setItem('scrollPosition', scrollPosition.toString())
      }
    })
  })

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="max-w-7xl mx-4 sm:mx-auto px-0 sm:px-4 sm:max-w-screen">
            <header className="relative mb-8 mt-4">
              <Header />
            </header>
            <div className="mx-4">{children}</div>
          </div>
        </div>
        <SiteFooter className="fixed inset-x-0 bottom-0 mx-4" />
      </div>
    </div>
  )
}

export default DefaultLayout
