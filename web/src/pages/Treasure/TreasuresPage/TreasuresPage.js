import { useState, useEffect } from 'react'
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import filters from '@treasure-chess/treasure-filters'

import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import FilterBar from 'src/components/FilterBar/FilterBar'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'

const defaultParams = {
  outcome: filters.outcomeList,
  sale: filters.saleList,
  termination: filters.terminationList[0],
}

const TreasuresPage = () => {
  const params = useParams()

  const { username = '', sort: initialSort = '', ...initialFilter } = params

  // These are the source of truth
  const [filter, setFilter] = useState(initialFilter)
  const [sort, _setSort] = useState(initialSort || 'Sort by') // TODO: Add sorting

  const updateUrl = () => {
    const searchParams = new URLSearchParams(filter)
    username && searchParams.append('username', username)
    sort && sort !== 'Sort by' && searchParams.append('sort', sort)
    searchParams.sort()
    const newPath = searchParams.toString()
      ? window.location.pathname + '?' + searchParams.toString()
      : window.location.pathname
    window.history.replaceState({}, '', newPath)
  }

  useEffect(() => {
    updateUrl()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [sort, filter])

  return (
    <div>
      <MetaTags title="Treasures" />

      <div className="flex">
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          defaultParams={defaultParams}
        />
        <div className="ml-4 w-full inline-flex">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown sort={sort} setSort={_setSort} />
          </div>
          <TreasuresFetcher
            username={username}
            filter={new URLSearchParams(filter).toString()}
            sort={new URLSearchParams(sort).toString()}
          />
        </div>
      </div>
    </div>
  )
}

export default TreasuresPage
