import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

import Icon from 'src/components/Icon/Icon'
import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'

import UsernameSearchBar from 'src/components/UsernameSearchBar'
import MemberBalance from 'src/components/Member/MemberBalance'

import { trimAddress } from 'src/utils/helpers'

const WalletBalance = () => {
  return (
    <div className="flex flex-col flex-1 text-sm">
      <div className={'header__nav__balance'}>
        <MemberBalance />
      </div>
      <div>
        <Button
          href="/fund-wallet"
          textColor="blue"
          className={'header__nav__fund-wallet'}
        >
          Fund Wallet
        </Button>
      </div>
    </div>
  )
}

const MobileNav = () => {
  const { isAuthenticated: isLoggedIn, logIn } = useAuth()
  const { pathname } = useLocation()
  const [isOpen, setOpen] = useState(false)

  const handleLogIn = () => logIn({ redirectTo: pathname })

  const navItemClasses = 'block text-center mt-4 flex'
  const navAnchorClasses = 'text-center w-full font-bold'

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (!isOpen) {
    return <Button onClick={() => setOpen(true)}>Menu</Button>
  }

  return createPortal(
    <div
      className="fixed flex inset-0"
      style={{ backgroundColor: 'hsla(36, 7%, 14%, 1)', zIndex: 100 }}
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div className="flex-1 flex justify-center">
        <nav>
          <ul className="h-full relative">
            <li className={navItemClasses}>
              <Button to={routes.home()}>
                <Icon name="treasure_chess_full_white" />
                <span className="sr-only">home</span>
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button to={routes.treasures()}>Treasures</Button>
            </li>
            <li className={navItemClasses}>
              <Link to={routes.faq()} className={navAnchorClasses}>
                About
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className={navItemClasses}>
                <button
                  type="button"
                  className={navAnchorClasses}
                  onClick={() => handleLogIn()}
                >
                  Log In
                </button>
              </li>
            ) : null}
            <li className="absolute" style={{ bottom: '10%' }}>
              <Button onClick={() => setOpen(false)} size="large">
                Close Menu
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>,
    document.querySelector('body')
  )
}

const Header = () => {
  const { isAuthenticated: isLoggedIn, currentUser: profile, logIn } = useAuth()
  const { pathname } = useLocation()
  const params = useParams()
  const { username: initialUsername = '', ...currentFilter } = params
  const handleLogIn = () => logIn({ redirectTo: pathname })

  const imageSrc = profile?.imageSrc || null

  const address = trimAddress(profile?.address) || 'No address set'

  const onUpdateUsername = (newUsername) => {
    const searchParams = new URLSearchParams(currentFilter)
    searchParams.append('username', newUsername)
    const newPath = searchParams.toString()
      ? window.location.pathname + '?' + searchParams.toString()
      : window.location.pathname
    window.history.replaceState({}, '', newPath)
  }
  // throw 'oops!'
  return (
    <div className={'header'}>
      <div className={'header__iconSearch'}>
        <Button to={routes.home()} className="mr-4">
          <Icon name="treasure_chess_full" height="35px" color="#fff" />
        </Button>
        <div className="hidden mr-4 lg:block">
          <UsernameSearchBar
            initialQuery={initialUsername}
            setQuery={onUpdateUsername}
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end lg:hidden">
        <MobileNav />
      </div>
      <div className={'header__nav hidden lg:flex'}>
        <div className="flex-1 flex items-center">
          <div className="mr-4">
            <Button to={routes.treasures()} size="large">
              <div className="flex items-center">
                <div className="mr-2">
                  <Icon name="treasure_chess" color="#ffffff" height="16px" />
                </div>
                Treasures
              </div>
            </Button>
          </div>
          <div>
            <Button to={routes.faq()} size="large">
              <div className="flex items-center">
                <img src="/icons/HelpIcon.png" alt="" className="mr-2" />
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
                  {profile.username}
                </Button>
                <div className="header__nav__address">{address}</div>
              </div>
            </div>
            <WalletBalance />
          </div>
        ) : (
          <Button textColor="blue" onClick={() => handleLogIn()}>
            Log In
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header
