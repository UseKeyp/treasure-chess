import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { debounce } from 'src/utils/helpers'

const USERNAME_QUERY = gql`
  query usernames($query: String!) {
    usernames(query: $query)
  }
`

const UsernameSearchBar = ({ initialQuery = '', setQuery }) => {
  const [value, setValue] = useState(initialQuery)
  const [_isValueFromSelector, setIsValueFromSelector] = useState(false)
  const [dropdownOptions, setDropdownOptions] = useState([])

  const [fetchUsernames, { _loading, _error }] = useLazyQuery(USERNAME_QUERY, {
    onCompleted: ({ usernames }) => {
      if (usernames.length === 0)
        return setDropdownOptions(['Username not found'])
      setDropdownOptions(usernames.slice(0, 6))
    },
  })

  const update = () => {
    if (value === '') return setDropdownOptions([])
    if (dropdownOptions.includes(value)) {
      // Handles typing full username, without using the dropdown
      setQuery(value)
      // Prevents performing another query after selection
      return setDropdownOptions([])
    }
    fetchUsernames({
      variables: {
        query: value,
      },
    })
  }

  const debounceUpdate = debounce(update, 1000)

  React.useEffect(() => {
    debounceUpdate()
  }, [value, debounceUpdate])

  const onSelectUsername = (option) => {
    setIsValueFromSelector(true)
    setValue(option)
    setQuery(option)
  }

  const onChange = (e) => {
    setIsValueFromSelector(false)
    setValue(e.target.value)
    // setQuery(e.target.value)
  }

  return (
    <div className={'searchBarContainer'}>
      <div>
        <input
          placeholder="Search Treasures"
          className="searchInput"
          onChange={onChange}
          value={value}
        />
      </div>
      {dropdownOptions?.length > 0 && (
        <div className="dropdownContainer">
          {dropdownOptions?.map((option) => (
            <button
              onClick={() => onSelectUsername(option)}
              key={option}
              className="dropdownContainer__dropdownOption"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default UsernameSearchBar
