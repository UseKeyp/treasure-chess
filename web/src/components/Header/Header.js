import styles from './Header.module.scss';


const Header = () => {
  return (
    <div className={styles.header}>
      <img src="/TreasureChessLogo.png" />
      <p>{'Find me in ./web/src/components/Header/Header.js'}</p>
    </div>
  )
}

export default Header
