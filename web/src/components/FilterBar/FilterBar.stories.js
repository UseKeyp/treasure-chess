import FilterBar from './FilterBar'

export const generated = () => {
  const [filter, setFilter] = React.useState({})
  return <FilterBar filter={filter} setFilter={setFilter} />
}

export default { title: 'Components/FilterBar' }
