const FilterContext = React.createContext({})

const initialState = {
  sort: '',
  username: '',
  filter: {},
}

const FilterProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState)
  const { sort, username, filter } = state

  const updateFilter = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  const resetFilter = () => setState(initialState)

  React.useEffect(() => {
    const searchParams = new URLSearchParams(filter)
    username && searchParams.append('username', username)
    sort && sort !== '' && searchParams.append('sort', sort)

    searchParams.sort()
    const newPath = searchParams.toString()
      ? window.location.pathname + '?' + searchParams.toString()
      : window.location.pathname
    window.history.replaceState({}, '', newPath)
  }, [sort, username, filter])

  return (
    <FilterContext.Provider
      value={{
        filter,
        sort,
        username,
        setFilter: updateFilter,
        resetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const useFilter = () => React.useContext(FilterContext)

export { FilterProvider, useFilter }
