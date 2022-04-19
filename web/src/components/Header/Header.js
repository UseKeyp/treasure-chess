import { useCallback, useEffect, useState } from 'react'
import { routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useWallet } from 'src/providers/wallet'

import Icon from 'src/components/Icon/Icon'
import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'
import MobileMenu from 'src/components/MobileMenu/MobileMenu'

import MemberBalance from 'src/components/Member/MemberBalance'

import { trimAddress } from 'src/utils/helpers'

const WalletBalance = () => {
  const { deposit } = useWallet()
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
          Add Funds
        </Button>
      </div>
    </div>
  )
}

const MobileNav = () => {
  const { isAuthenticated: isLoggedIn, logOut } = useAuth()
  const { pathname } = useLocation()

  const isOnTreasuresPage = pathname === '/treasures'
  const isOnAboutPage = pathname === '/about'

  const navItemClasses = 'block text-center mt-4 flex'
  const navAnchorClasses = 'text-center w-full font-bold'

  return (
    <MobileMenu triggerContents="Menu">
      <div className="flex-1 flex justify-center">
        <nav>
          <ul className="h-full relative grid place-items-center">
            <li className={navItemClasses}>
              <Button to={routes.home()}>
                <Icon name="treasure_chess_full" height="35px" color="#fff" />
                <span className="sr-only">home</span>
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button isSelected={isOnTreasuresPage} to={routes.treasures()}>
                Treasures
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button
                isSelected={isOnAboutPage}
                to={routes.about()}
                className={navAnchorClasses}
              >
                About
              </Button>
            </li>
            {!isLoggedIn ? (
              <li className={navItemClasses}>
                <Button className={navAnchorClasses} to={routes.signin()}>
                  Sign In
                </Button>
              </li>
            ) : (
              <>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} to={routes.profile()}>
                    Profile
                  </Button>
                </li>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} onClick={logOut}>
                    Log Out
                  </Button>
                </li>
              </>
            )}
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

  const isOnTreasuresPage = pathname === '/treasures'
  const isOnAboutPage = pathname === '/about'

  const imageSrc = profile?.imageSrc || null

  const address = trimAddress(profile?.address) || 'No address set'

  const handleUserStatus = useCallback(() => {
    if (profile !== null && profile?.banned) {
      logOut()
    }
  }, [profile, logOut])
  const [isShowingTooltip, setIsShowingTooltip] = useState(false)

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
                Treasures
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
                About
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
              <Button
                onClick={logOut}
                onMouseEnter={() => setIsShowingTooltip(true)}
                onMouseLeave={() => setIsShowingTooltip(false)}
              >
                <Icon name="logout" color="grey" />
              </Button>
              {isShowingTooltip && <p className="header__tooltip">Log out</p>}
            </div>
          </div>
        ) : (
          <Button to={routes.signin()}>Sign In</Button>
        )}
      </div>
    </div>
  )
}

export default Header
