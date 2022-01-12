const FilterContext = React.createContext({})

const initialState = {
  filterValue: {},
  sortValue: 'Sort by',
  usernameValue: '',
}

const FilterProvider = ({ children }) => {
  const [state, setState] = React.useState(initialState)

  const updateFilter = (filter, value) => {
    setState({
      ...state,
      [filter]: value,
    })
  }

  const resetFilter = () => setState(initialState)

  return (
    <FilterContext.Provider
      value={{
        filter: state.filterValue,
        sort: state.sortValue,
        username: state.usernameValue,
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
