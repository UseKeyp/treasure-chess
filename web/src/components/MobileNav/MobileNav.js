import { useState } from 'react'
import treasureChessLogoSrc from './treasure-chess-logo.png'

import { Menu, X } from 'react-feather'

const MobileNav = ({ onClick }) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <div
      className="mobile-nav-outer-container h-screen overflow-y-hidden absolute w-full"
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
            Treasure Chess
          </h2>
        </div>
        <button onClick={() => setExpanded(!isExpanded)}>
          {isExpanded ? <X size={40} /> : <Menu size={40} />}
        </button>
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
        <a className="mobile-nav-link" href="/marketplace">
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
