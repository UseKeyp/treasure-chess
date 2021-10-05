import styles from './Header.module.scss';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  return (
		<div className={styles.header}>
			<div>
				<img src="/TreasureChessLogo.png" />
				<SearchBar />
			</div>
      <p>{'Find me in ./web/src/components/Header/Header.js'}</p>
    </div>
  )
}

export default Header
