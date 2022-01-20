import filters from '@treasure-chess/treasure-filters'
import Dropdown from 'src/components/Dropdown/Dropdown'

import { useFilter } from 'src/providers/filters'

const SortingDropdown = () => {
  const { sort, setFilter } = useFilter()

  const setSort = (value) => {
    setFilter('sort', value)
  }

  return (
    <div className="absolute w-full" style={{ maxWidth: '235px' }}>
      <Dropdown
        default="Sort by"
        options={filters.sortList}
        queryFilterFunction={setSort}
        queryFilter={sort}
      />
    </div>
  )
}

export default SortingDropdown
