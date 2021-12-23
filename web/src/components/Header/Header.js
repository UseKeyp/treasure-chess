import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

import Avatar from 'src/components/Avatar/Avatar'

import UsernameSearchBar from 'src/components/UsernameSearchBar'
import MemberBalance from 'src/components/Member/MemberBalance'
import { ReactComponent as TreasureChest } from 'src/assets/icons/TreasureChessChest.svg'

import { trimAddress } from 'src/utils/helpers'

const WalletBalance = () => {
  return (
    <div className="flex flex-col flex-1 text-sm">
      <div className={'header__nav__balance'}>
        <MemberBalance />
      </div>
      <div>
        <a href="/fund-wallet" className={'header__nav__fund-wallet'}>
          Fund Wallet
        </a>
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
    return (
      <button
        type="button"
        className="font-bold hover:underline"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
    )
  }

  return createPortal(
    <div
      className="fixed flex inset-0"
      style={{ backgroundColor: 'hsla(36, 7%, 14%, 1)' }}
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div className="flex-1 flex justify-center">
        <nav>
          <ul className="h-full relative">
            <li className={navItemClasses}>
              <Link to={routes.home()}>
                <img src="/TreasureChessLogo.png" alt="TreasureChess.com" />
                <span className="sr-only">home</span>
              </Link>
            </li>
            <li className={navItemClasses}>
              <Link to={routes.treasures()} className={navAnchorClasses}>
                Treasures
              </Link>
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
              <button
                type="button"
                className={navAnchorClasses}
                onClick={() => setOpen(false)}
              >
                Close Menu
              </button>
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

  return (
    <div className={'header'}>
      <div className={'header__iconSearch'}>
        <Link to={routes.home()}>
          <img src="/TreasureChessLogo.png" alt="TreasureChess.com" />
        </Link>
        <div className="hidden lg:block">
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
          <div>
            <Link to={routes.treasures()} className="font-bold">
              <TreasureChest />
              Treasures
            </Link>
          </div>
          <div>
            <Link to={routes.faq()} className="font-bold">
              <img src="/icons/TreasureChessHelpIcon.png" alt="" />
              About
            </Link>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="mr-4 w-8 h-8 flex items-center justify-center">
              <Avatar size="32px" src={imageSrc} />
            </div>
            <div className="mr-4">
              <div className="flex flex-col text-sm text-left">
                <Link className={'header__nav__username'} to={routes.profile()}>
                  {profile.username}
                </Link>
                <div className={'header__nav__address'}>{address}</div>
              </div>
            </div>
            <WalletBalance />
          </div>
        ) : (
          <button
            type="button"
            className={'header__nav__login'}
            onClick={() => handleLogIn()}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
