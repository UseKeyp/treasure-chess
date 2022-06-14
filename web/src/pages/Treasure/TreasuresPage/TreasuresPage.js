import { MetaTags } from '@redwoodjs/web'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'
import FilterBar from 'src/components/FilterBar/FilterBar'
import SortingDropdown from 'src/components/SortingDropdown/SortingDropdown'
import MobileMenu from 'src/components/MobileMenu/MobileMenu'
import { FunnelFill } from 'framework7-icons/react'

import { useFilter } from 'src/providers/filters'
import { useEffect, useState } from 'react'

const TreasuresPage = () => {
  const { filter, sort, username, defaultParams } = useFilter()
  const [collapsedTreasures, setCollapseTreasures] = useState(false)

  useEffect(() => {}, [setCollapseTreasures])
  return (
    <div>
      <MetaTags
        title="Explore"
        description="Explore Treasures from your favorite players and friends."
      />
      <div className="flex">
        <div className="md:mr-4 w-full">
          <div className="flex w-full justify-end relative mb-4">
            <SortingDropdown />
          </div>
          <TreasuresFetcher
            collapsedTreasures={collapsedTreasures}
            username={username}
            filter={new URLSearchParams(filter).toString()}
            sort={sort}
          />
        </div>
        <FilterBar defaultParams={defaultParams} hideOnMobile />
      </div>
      <div className="mobile-filter">
        <MobileMenu
          direction="ltr"
          triggerContents={
            <div className="flex justify-center align-center py-1">
              <FunnelFill className="w-7 h-7 mr-3" />
              <h2>Filter</h2>
            </div>
          }
          triggerProps={{ variant: 'grey', fluid: true }}
          disableAutoClose
          title="Filter"
          setCollapseTreasures={setCollapseTreasures}
        >
          <div className="w-full flex justify-center items-center">
            <FilterBar
              defaultParams={defaultParams}
              showScrollbar
              extendAchievements
            />
          </div>
        </MobileMenu>
      </div>
    </div>
  )
}

export default TreasuresPage
