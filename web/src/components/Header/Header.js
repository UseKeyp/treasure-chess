import { useMemo } from 'react'
import { useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import EmptyAvatar from 'src/components/Avatar/EmptyAvatar'
import SearchBar from 'src/components/Marketplace/SearchBar'
import { ReactComponent as TreasureChest } from 'src/assets/icons/TreasureChessChest.svg'

import styles from './Header.module.scss'

const WalletBalance = () => {
  return (
    <div className="flex flex-col flex-1 text-sm">
      <div className={styles['nav--balance']}>Balance $62</div>
      <div>
        <a href="/fund-wallet" className={styles['nav--fund-wallet']}>
          Fund Wallet
        </a>
      </div>
    </div>
  )
}

const Header = () => {
  const { isAuthenticated: isLoggedIn, currentUser: profile, logIn } = useAuth()
  const { pathname } = useLocation()

  const handleLogIn = () => logIn({ redirectTo: pathname })

  const imageSrc = useMemo(() => {
    if (profile === null || profile.imageSrc === null) {
      return false
    }
    return profile.imageSrc
  }, [profile])

  const address = useMemo(() => {
    if (profile === null || profile.address === null) {
      return null
    }
    const address1 = profile.address.slice(0, 6)
    const address2 = profile.address.slice(profile.address.length - 4)

    return `${address1}...${address2}`
  }, [profile])

  return (
    <div className={styles.header}>
      <div className={styles.iconSearch}>
        <a href="/">
          <img src="/TreasureChessLogo.png" alt="TreasureChess.com" />
        </a>
        <SearchBar />
      </div>
      <div className={styles.nav}>
        <div className="flex-1 flex items-center">
          <div>
            <a href="/" className="font-bold">
              <TreasureChest />
              Treasures
            </a>
          </div>
          <div>
            <a href="/" className="font-bold">
              <img src="/icons/TreasureChessHelpIcon.png" alt="" />
              About
            </a>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="mr-4 w-8 h-8 rounded-md">
              {imageSrc ? <img src={imageSrc} alt="" /> : <EmptyAvatar className="rounded-md" />}
            </div>
            <div className="mr-4">
              <div className="flex flex-col text-sm text-left">
                <a className={styles['nav--username']} href={`/${profile?.uri || ''}`}>
                  {profile.username}
                </a>
                <div className={styles['nav--address']}>{address}</div>
              </div>
            </div>
            <WalletBalance />
          </div>
        ) : (
          <button type="button" className="font-bold text-blue-500" onClick={() => handleLogIn()}>
            Log In
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
