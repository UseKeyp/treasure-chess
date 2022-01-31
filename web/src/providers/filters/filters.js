import filters from '@treasure-chess/treasure-filters'
const FilterContext = React.createContext({})

const initialState = {
  sort: undefined,
  username: '',
  filter: {},
  initialized: false,
}

const defaultParams = {
  outcome: filters.outcomeList,
  sale: filters.saleList,
  termination: filters.terminationList[0],
  sort: filters.sortList[4],
}

const FilterProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState)
  const { sort, username, filter, initialized } = state

  const updateFilter = (key, value) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  const resetFilter = () => setState({ ...initialState, initialized: true })

  const updateUrl = () => {
    const searchParams = new URLSearchParams(filter)
    username && searchParams.append('username', username)
    sort && sort !== defaultParams.sort && searchParams.append('sort', sort)

    searchParams.sort()
    const newPath = searchParams.toString()
      ? window.location.pathname + '?' + searchParams.toString()
      : window.location.pathname
    window.history.replaceState({}, '', newPath)
  }

  const onPageLoad = () => {
    // Consume existing url
    const searchParams = new URLSearchParams(window.location.search)
    let newState = {}
    for (var pair of searchParams.entries()) {
      const key = pair[0]
      const value = pair[1]
      if (key === 'username' || key === 'sort') {
        newState[key] = value
      } else {
        newState.filter = { ...newState.filter, [key]: value }
      }
    }
    setState({ ...state, ...newState, initialized: true })
  }
  React.useEffect(() => {
    if (!initialized) return
    updateUrl()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [sort, username, filter])

  React.useEffect(() => {
    onPageLoad()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return (
    <FilterContext.Provider
      value={{
        filter,
        sort,
        username,
        defaultParams,
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
