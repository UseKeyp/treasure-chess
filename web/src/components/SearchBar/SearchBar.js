import { useState } from 'react'
import styles from './SearchBar.module.scss';

const SearchBar = (props) => {
  const [value, setValue] = useState(null)
  const [isValueFromSelector, setIsValueFromSelector] = useState(false)

  let dropdownOptions = []

  if (value && !isValueFromSelector) {
    // Limit to 6 options
    dropdownOptions = props.options
      .filter((option) => option.indexOf(value) > -1)
      .slice(0, 6)
  }

  return (
		<div className={`searchBarContainer ${styles.searchBarContainer}`}>
			<div className={styles.searchOuterWrap}>
      <input
        placeholder="Search Marketplace"
        onChange={(e) => {
          setIsValueFromSelector(false)
          setValue(e.target.value)
        }}
        value={value}
				/>

			</div>
      {!!dropdownOptions.length && (
        <div className="dropdownContainer">
          {dropdownOptions.map((option) => (
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
