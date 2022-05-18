import { useState, useRef } from 'react'
import { useLazyQuery } from '@apollo/client'
import { debounce } from 'src/utils/helpers'

import { useFilter } from 'src/providers/filters'

const USERNAME_QUERY = gql`
  query usernames($query: String!) {
    usernames(query: $query)
  }
`

const UsernameSearchBar = ({ setValue: setParentValue }) => {
  const { username, setFilter } = useFilter()

  const ref = useRef(null)

  React.useEffect(() => {
    if (username == '') setValue('')
  }, [username])

  const [value, setValue] = useState(username)

  const [isValueFromSelector, setIsValueFromSelector] = useState(false)
  const [dropdownOptions, setDropdownOptions] = useState([])

  const [fetchUsernames, { _loading, _error }] = useLazyQuery(USERNAME_QUERY, {
    onCompleted: ({ usernames }) => {
      if (usernames.length === 0)
        return setDropdownOptions(['Username not found'])
      setDropdownOptions(usernames.slice(0, 6))
    },
  })

  const update = () => {
    if (!ref.current) return
    if (value === '') return setDropdownOptions([])
    if (dropdownOptions.includes(value)) {
      // Handles when user types full username, without clicking from the dropdown
      setParentValue ? setParentValue(value) : setFilter('username', value)
      // Prevents performing another query after selection
      return setDropdownOptions([])
    }
    fetchUsernames({ variables: { query: value } })
  }

  const debounceUpdate = debounce(update, 1000)

  React.useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  })

  React.useEffect(() => {
    debounceUpdate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isValueFromSelector])

  const onSelectUsername = (option) => {
    setIsValueFromSelector(true)
    setValue(option)
    setParentValue ? setParentValue(option) : setFilter('username', option)
  }

  const onChange = (e) => {
    if (e.target.value === '') {
      update('')
      setValue('')
      setParentValue
        ? setParentValue(undefined)
        : setFilter('username', undefined)
      return
    }

    setIsValueFromSelector(false)
    setValue(e.target.value)
  }

  return (
    <div className="relative">
      <div className={'searchBarContainer'}>
        <input
          placeholder="Search"
          className="searchInput"
          onChange={onChange}
          value={value}
        />
      </div>
      {dropdownOptions?.length > 0 && (
        <div className="dropdownContainer">
          <div className="dropdownContainer__options">
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
        </div>
      )}
    </div>
  )
}

export default UsernameSearchBar
