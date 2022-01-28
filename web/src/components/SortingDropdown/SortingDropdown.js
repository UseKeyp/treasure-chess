import filters from '@treasure-chess/treasure-filters'
import Dropdown from 'src/components/Dropdown/Dropdown'

import { useFilter } from 'src/providers/filters'

const SortingDropdown = () => {
  const { sort, setFilter, defaultParams } = useFilter()

  const setSort = (value) => {
    setFilter('sort', value)
  }

  return (
    <div className="absolute w-full" style={{ maxWidth: '235px' }}>
      <Dropdown
        default={defaultParams.sort}
        options={filters.sortList}
        queryFilterFunction={setSort}
        queryFilter={sort}
      />
    </div>
  )
}

export default SortingDropdown
