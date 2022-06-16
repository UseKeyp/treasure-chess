import { useCallback, useEffect } from 'react'
import { routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useRamp } from 'src/providers/ramp/ramp'

import { useLocale } from 'src/providers/locale'

import { Menu } from 'framework7-icons/react'

import Icon from 'src/components/Icon/Icon'
import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'
import MobileMenu from 'src/components/MobileMenu/MobileMenu'

import MemberBalance from 'src/components/Member/MemberBalance'

import { trimAddress } from 'src/utils/helpers'
import Tooltip from 'src/components/Tooltip/Tooltip'
import globalConfig from 'src/global.config'

const WalletBalance = () => {
  const { deposit } = useRamp()
  return (
    <div className="flex flex-col flex-1 text-sm">
      <div className={'header__nav__balance'}>
        <MemberBalance />
      </div>
      <div>
        <Button
          onClick={deposit}
          textColor="blue"
          className={'header__nav__fund-wallet'}
        >
          {t('Add Funds')}
        </Button>
      </div>
    </div>
  )
}

const MobileNav = () => {
  const currentYear = new Date().getFullYear()
  const { isAuthenticated: isLoggedIn, logOut } = useAuth()
  const { pathname } = useLocation()
  const { t } = useLocale()

  const isOnTreasuresPage = pathname === '/treasures'
  const isOnAboutPage = pathname === '/about'

  const navItemClasses = 'block text-center mt-4 flex'
  const navAnchorClasses = 'text-center w-full font-bold'

  return (
    <MobileMenu triggerContents={<Menu className="w-7 h-7" />}>
      <div className="flex-1 flex justify-center">
        <nav>
          <ul className="h-full relative grid place-items-center">
            <li className={navItemClasses}>
              <Button to={routes.home()}>
                <Icon name="treasure_chess_full" height="35px" color="#fff" />
                <span className="sr-only">{t('home')}</span>
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button isSelected={isOnTreasuresPage} to={routes.treasures()}>
                {t('Treasures')}
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button
                isSelected={isOnAboutPage}
                to={routes.about()}
                className={navAnchorClasses}
              >
                {t('About')}
              </Button>
            </li>
            {!isLoggedIn ? (
              <li className={navItemClasses}>
                <Button className={navAnchorClasses} to={routes.signin()}>
                  {t('Sign In')}
                </Button>
              </li>
            ) : (
              <>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} to={routes.profile()}>
                    {t('Profile')}
                  </Button>
                </li>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} onClick={logOut}>
                    {t('Log Out')}
                  </Button>
                </li>
              </>
            )}
            <div className="flex mt-4 bg-chessBlack-100 pb-4 pr-4 pl-4 rounded-lg">
              <div className="flex flex-col">
                <div className="flex justify-center mt-4 space-x-6">
                  <a href={globalConfig.DISCORD_URL}>
                    <Icon name="discord" size="24px" />
                    <span className="sr-only">discord</span>
                  </a>
                  <a href={globalConfig.TWITTER_URL}>
                    <Icon name="twitter" color="#fff" size="24px" />
                    <span className="sr-only">twitter</span>
                  </a>
                  <a href={globalConfig.GITHUB_URL}>
                    <Icon name="github" size="24px" />
                    <span className="sr-only">Github</span>
                  </a>
                </div>
                <div className="flex justify-center">
                  <li className={navItemClasses}>
                    <Button className={navAnchorClasses}>
                      <a
                        className="hover:no-underline"
                        href={globalConfig.BLOG_URL}
                      >
                        {t('Blog')}
                      </a>
                    </Button>
                  </li>
                  <li className={navItemClasses}>
                    <Button
                      isSelected={isOnAboutPage}
                      className={navAnchorClasses}
                    >
                      {t('Terms')}
                    </Button>
                  </li>
                </div>
                <div className="flex justify-center">
                  <li className={navItemClasses}>
                    <Button
                      isSelected={isOnAboutPage}
                      to={routes.about()}
                      className={navAnchorClasses}
                    >
                      {t('Privacy')}
                    </Button>
                  </li>
                  <li className={navItemClasses}>
                    <Button
                      isSelected={isOnAboutPage}
                      to={routes.about()}
                      className={navAnchorClasses}
                    >
                      {t('Support')}
                    </Button>
                  </li>
                </div>
                <div className="flex items-center mt-4 space-x-4">
                  <a href={globalConfig.CHESS_COM_BASE_URL}>
                    <Icon name="chess_com" height="25" />
                    <span className="sr-only">Chess.com</span>
                  </a>
                  <div className="text-sm">
                    © Nifty Chess, Inc. {currentYear}
                  </div>
                  <div className="text-sm">{process.env.VERSION}</div>
                </div>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </MobileMenu>
  )
}

const Header = () => {
  const {
    isAuthenticated: isLoggedIn,
    currentUser: profile,
    logOut,
  } = useAuth()
  const { pathname } = useLocation()
  const { t } = useLocale()

  const isOnTreasuresPage = pathname === '/treasures'
  const isOnAboutPage = pathname === '/about'

  const imageSrc = profile?.imageSrc || null

  const address = trimAddress(profile?.address) || 'No address set'

  const handleUserStatus = useCallback(() => {
    if (profile !== null && profile?.banned) {
      logOut()
    }
  }, [profile, logOut])

  useEffect(() => {
    handleUserStatus()
  }, [handleUserStatus])

  return (
    <div className={'header'}>
      <Button to={routes.home()} className="mr-4 align-center">
        <Icon name="treasure_chess_full" height="35px" color="#fff" />
      </Button>
      <div className="flex flex-1 items-center justify-end lg:hidden">
        <MobileNav />
      </div>
      <div className={'header__nav hidden lg:flex'}>
        <div className="flex-1 flex items-center">
          <div className="mr-4">
            <Button
              to={routes.treasures()}
              size="large"
              isSelected={isOnTreasuresPage}
            >
              <div className="flex items-center">
                <div className="mr-2">
                  <Icon name="treasure_chess" color="#ffffff" height="16px" />
                </div>
                {t('Treasures')}
              </div>
            </Button>
          </div>
          <div className="mr-4">
            <Button to={routes.about()} size="large" isSelected={isOnAboutPage}>
              <div className="flex items-center">
                <div className="mr-2">
                  {' '}
                  <Icon name="help" size="small" />{' '}
                </div>
                {t('About')}
              </div>
            </Button>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="mr-4 w-8 h-8 flex items-center justify-center">
              <Avatar size="32px" src={imageSrc} />
            </div>
            <div className="mr-4">
              <div className="flex flex-col text-sm text-left">
                <Button
                  to={routes.profile()}
                  textColor="blue"
                  className="header__nav__username"
                >
                  {profile?.username}
                </Button>
                <div className="header__nav__address">{address}</div>
              </div>
            </div>
            <WalletBalance />
            <div className="ml-4">
              <Button onClick={logOut}>
                <Tooltip
                  id="logout-tooltip"
                  effect="solid"
                  text="Log Out"
                  position="bottom"
                  bgColor="dark"
                >
                  <Icon name="logout" color="grey" />
                </Tooltip>
              </Button>
            </div>
          </div>
        ) : (
          <Button to={routes.signin()}>{t('Sign In')}</Button>
        )}
      </div>
    </div>
  )
}

export default Header
