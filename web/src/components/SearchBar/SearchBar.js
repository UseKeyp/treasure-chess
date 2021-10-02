import { useState } from 'react'

const SearchBar = ({ options }) => {
  const [value, setValue] = useState(null)
  const [isValueFromSelector, setIsValueFromSelector] = useState(false)

  let dropdownOptions = []

  if (value && !isValueFromSelector) {
    // Limit to 6 options
    dropdownOptions = options
      .filter((option) => option.indexOf(value) > -1)
      .slice(0, 6)
  }

  return (
    <div className="searchBarContainer">
      <input
        placeholder="Search Marketplace"
        onChange={(e) => {
          setIsValueFromSelector(false)
          setValue(e.target.value)
        }}
        value={value}
      />
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
