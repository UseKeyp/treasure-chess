import Header from 'src/components/Header'

import SiteFooter from './SiteFooter'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="max-w-7xl mx-4 sm:mx-auto px-0 sm:px-4 sm:max-w-screen">
            <header className="relative mb-8 mt-4 px-4">
              <Header />
            </header>
            <div className="mx-4">{children}</div>
            <SiteFooter className="self-end" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
