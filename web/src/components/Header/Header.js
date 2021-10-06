import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import { ReactComponent as TreasureChest } from '../../assets/icons/TreasureChessChest.svg'
import { NewButton } from '../Button/Button'

const Header = () => {
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
        <NewButton label="LogIn" />
      </div>
    </div>
  )
}

export default Header
