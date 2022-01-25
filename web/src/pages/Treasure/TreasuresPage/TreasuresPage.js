import { MetaTags } from '@redwoodjs/web'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import FilterBar from 'src/components/FilterBar/FilterBar'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'
import { useFilter } from 'src/providers/filters'

const TreasuresPage = () => {
  const { filter, sort, username, defaultParams } = useFilter()

  return (
    <div>
      <MetaTags title="Treasures" />

      <div className="flex">
        <div className="mr-4 w-full">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown />
          </div>
          <TreasuresFetcher
            username={username}
            filter={new URLSearchParams(filter).toString()}
            sort={sort}
          />
        </div>
        <FilterBar defaultParams={defaultParams} />
      </div>
    </div>
  )
}

export default TreasuresPage
