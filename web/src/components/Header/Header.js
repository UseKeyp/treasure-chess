import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { ReactComponent as TreasureChest } from '../../assets/icons/TreasureChessChest.svg'
import { NewButton } from '../Button/Button'
import { useState } from 'react'

/**
 *
 * @param {Bool} isLoggedIn Whether or not the user is currently logged in
 * @param {Object} profile The user's profile
 * @returns A nifty header with state
 */
const Header = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn || false)
  const [profile, setProfile] = useState(props.profile || null)

  return (
    <div className={styles.header}>
      <div className={styles.iconSearch}>
        <a href="/">
          <img src="/TreasureChessLogo.png" alt="TreasureChess.com" />
        </a>
        <SearchBar />
      </div>
      <div className={styles.nav}>
        <a href="/">
          <TreasureChest />
          Treasures
        </a>
        <a href="/">
          <img src="/icons/TreasureChessHelpIcon.png" alt="" />
          FAQ
        </a>
        <a href={`/${profile?.uri || ''}`}>
          {/* placeholder for Profile Icon */}
          Profile
        </a>
        {isLoggedIn ? (
          <NewButton
            label="Log Out"
            clickFunction={() =>
              alert(
                "I am a placeholder! Please do not click me! It's my first day :("
              )
            }
          />
        ) : (
          <NewButton
            label="Log In"
            clickFunction={() =>
              alert(
                "I am a placeholder! Please do not click me! It's my first day :("
              )
            }
          />
        )}
      </div>
    </div>
  )
}

export default Header
