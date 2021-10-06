import { useState } from 'react'
import styles from './SearchBar.module.scss'
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg'

const SearchBar = (props) => {
  const [value, setValue] = useState(null)
  const [isValueFromSelector, setIsValueFromSelector] = useState(false)

  // let dropdownOptions = []

  // if (value && !isValueFromSelector) {
  //   // Limit to 6 options
  //   dropdownOptions = props.options
  //     .filter((option) => option.indexOf(value) > -1)
  //     .slice(0, 6)
  // }

  return (
    <div className={`searchBarContainer ${styles.searchBarContainer}`}>
      <div className={styles.searchOuterWrap}>
        <input
          placeholder="Search Treasures"
          onChange={(e) => {
            setIsValueFromSelector(false)
            setValue(e.target.value)
          }}
          value={value}
        />
        <div className={styles.iconWrap}>
          <SearchIcon />
        </div>
      </div>
      {(typeof dropdownOptions !== 'undefined' && dropdownOptions?.length) >
        0 && (
        <div className="dropdownContainer">
          {dropdownOptions?.map((option) => (
            <button
              onClick={() => {
                setIsValueFromSelector(true)
                setValue(option)
              }}
              key={option}
              className="dropdownOption"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
