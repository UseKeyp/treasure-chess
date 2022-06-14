import { useState } from 'react'

import Header from 'src/components/Header'
import SiteFooter from 'src/components/SiteFooter'
import CampaignBanner from 'src/components/CampaignBanner/CampaignBanner'
import Icon from 'src/components/Icon'

import { Tabbar, TabbarLink, Icon as KonstaIcon } from 'konsta/react'
import { navigate, routes, useLocation } from '@redwoodjs/router'

import { Person, WalletFill, QuestionCircle } from 'framework7-icons/react'

import { isMobile } from 'src/utils/helpers'

const DefaultLayout = ({ children }) => {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState(pathname.split('/')[1] || 'home')

  const onClick = (routeName) => {
    setActiveTab(routeName)
    navigate(routes[routeName]())
  }

  React.useEffect(() => {
    const cleanedPath = pathname.split('/')[1] || 'home'
    const tabs = ['wallet', 'treasures', 'profile', 'support']
    if (tabs.includes(cleanedPath)) setActiveTab(cleanedPath)
  }, [pathname])

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <CampaignBanner />
          <div className="max-w-7xl mx-4 sm:mx-auto px-0 sm:px-4 sm:max-w-screen">
            <header className="relative mb-8 mt-4">
              <Header />
            </header>
            <div className="mx-4 min-h-screen">{children}</div>
          </div>
        </div>
        <SiteFooter />
        {isMobile && (
          <Tabbar labels={true} className="left-0 bottom-0 fixed">
            <TabbarLink
              active={activeTab === 'profile'}
              onClick={() => onClick('profile')}
              icon={
                <KonstaIcon
                  ios={<Person className="w-7 h-7" />}
                  material={<Person className="w-6 h-6" />}
                />
              }
              label="Profile"
            />
            <TabbarLink
              active={activeTab === 'treasures'}
              onClick={() => onClick('treasures')}
              icon={
                <Icon
                  name="treasure_chess"
                  color={activeTab === 'treasures' ? '#272522' : '#8e8e8e'}
                  height={22}
                />
              }
              label="Treasures"
            />
            <TabbarLink
              active={activeTab === 'wallet'}
              onClick={() => onClick('wallet')}
              icon={
                <KonstaIcon
                  ios={<WalletFill className="w-7 h-7" />}
                  material={<WalletFill className="w-6 h-6" />}
                />
              }
              label="Wallet"
            />
            <TabbarLink
              active={activeTab === 'support'}
              onClick={() => onClick('support')}
              icon={
                <KonstaIcon
                  ios={<QuestionCircle className="w-7 h-7" />}
                  material={<QuestionCircle className="w-6 h-6" />}
                />
              }
              label="Support"
            />
          </Tabbar>
        )}
      </div>
    </div>
  )
}

export default DefaultLayout
