import { MetaTags } from '@redwoodjs/web'
import filters from '@treasure-chess/treasure-filters'

import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import FilterBar from 'src/components/FilterBar/FilterBar'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'

import { useFilter } from 'src/providers/filters'

const defaultParams = {
  outcome: filters.outcomeList,
  sale: filters.saleList,
  termination: filters.terminationList[0],
}

const TreasuresPage = () => {
  const { filter, sort, username } = useFilter()

  return (
    <div>
      <MetaTags title="Treasures" />

      <div className="flex">
        <FilterBar defaultParams={defaultParams} />
        <div className="ml-4 w-full">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown />
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
