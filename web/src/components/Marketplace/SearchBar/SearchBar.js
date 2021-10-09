import styles from './SearchBar.module.scss'
/**
 * This is a search bar
 * @param {*} value Pass a stateful variable as a value to control the state of the input
 * @param {Function} changeHandler Pass a function via props to be triggered on value change
 * Renders a styled interactive searchbar that has a value change event listener
 */
const SearchBar = ({ value, changeHandler }) => {
  return (
    <input
      type="text"
      placeholder={'Search Marketplace'}
      className={styles.searchBar}
      value={value}
      onChange={(e) => changeHandler(e.target.value)}
    />
  )
}

export default SearchBar
