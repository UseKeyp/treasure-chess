import Header from 'src/components/Header'

import SiteFooter from './SiteFooter'

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative mb-8">
        <Header />
      </header>
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-0 sm:px-0 sm:max-w-screen">
          {children}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

export default DefaultLayout
