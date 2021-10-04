import { useState } from 'react'
import { Menu, X } from 'react-feather'
import { NavLink, routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
// import treasureProfile from './treasure-profile.png'

import Avatar from 'src/components/Avatar'

import { isMobile, trimAddress } from 'src/utils/helpers'
import treasureChessLogoSrc from './treasure-chess-logo.png'

const MobileNav = ({ forceSmallNav = false }) => {
  const [isExpanded, setExpanded] = useState(false)
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  const { pathname } = useLocation()

  const onClick = (e) => {
    if (e.target.id === 'login') logIn({ redirectTo: pathname })
    if (e.target.id === 'logout') logOut()
  }

  const userDetails = isAuthenticated ? (
    <>
      <Avatar image={currentUser.imageSrc} className="w-12" />
      <div className="ml-4">
        <div className="text-sm font-bold">{currentUser.username}</div>
        <button
          onClick={onClick}
          id="logout"
          className="text-sm rounded font-bold px-5 py-1"
          style={{
            background: 'linear-gradient(180deg, #B9CC36 0%, #7FA650 100%)',
          }}
        >
          {trimAddress(currentUser.address)}
        </button>
      </div>
    </>
  ) : (
    <button
      onClick={onClick}
      id="login"
      className="rect-button w-full mt-5"
      role="link"
    >
      Chess.com Login
    </button>
  )

  const showMobileNav = forceSmallNav || isMobile

  return (
    <div
      className="mobile-nav-outer-container h-screen overflow-y-hidden w-full px-4 sm:px-6 sm:max-w-screen"
      style={{
        maxHeight: isExpanded ? 1000 : 100,
      }}
    >
      <div className="flex items-center justify-between pl-3 pr-6 h-24 w-full">
        <div className="flex">
          <img
            className="flex-grow-0 h-12 w-12"
            src={treasureChessLogoSrc}
            alt="Treasure chess logo"
          />
          <h2 className="header-title flex-grow-0 font-black leading-none pl-6 pr-10 header-title">
            Treasure
            <br /> Chess
          </h2>
        </div>
        {showMobileNav ? (
          <button onClick={() => setExpanded(!isExpanded)}>
            {isExpanded ? <X size={40} /> : <Menu size={40} />}
          </button>
        ) : (
          <div className="mt-2">
            <div className="flex items-center">{userDetails}</div>
            <div className="flex items-center text-sm mt-2">
              <NavLink
                to={routes.home()}
                className="ml-2"
                activeClassName="underline"
              >
                Home
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to={routes.profile()}
                  activeClassName="underline"
                  className="ml-2"
                >
                  Profile
                </NavLink>
              )}
              <NavLink
                className="ml-2"
                to={routes.marketplace()}
                activeClassName="underline"
              >
                Marketplace
              </NavLink>
              <NavLink
                className="ml-2"
                to={routes.faq()}
                activeClassName="underline"
              >
                FAQ
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div
        className="py-5 px-10 expandable-header-section"
        style={{
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <a className="mobile-nav-link" href="/home">
          Home
        </a>
        <a className="mobile-nav-link" href="/profile">
          Profile
        </a>
        <a className="mobile-nav-link" href={routes.marketplace()}>
          Marketplace
        </a>
        <a className="mobile-nav-link" href="/faq">
          FAQ
        </a>
        <button
          onClick={onClick}
          id="login"
          className="rect-button mt-5"
          role="link"
        >
          Chess.com Login
        </button>
      </div>
    </div>
  )
}

export default MobileNav
