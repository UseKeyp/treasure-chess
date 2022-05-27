import Header from 'src/components/Header'

import SiteFooter from 'src/components/SiteFooter'
import CampaignBanner from 'src/components/CampaignBanner/CampaignBanner'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <CampaignBanner />
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
