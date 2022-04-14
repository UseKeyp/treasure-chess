import filters from '@treasure-chess/treasure-filters'
import { useState } from 'react'

import { anyValues } from './Logic'
import FilterCheckbox from 'src/components/FilterCheckbox/FilterCheckbox'
import FilterPriceInput from 'src/components/FilterPriceInput/FilterPriceInput'
import Dropdown from 'src/components/Dropdown/Dropdown'
import AchievementScroll from 'src/components/AchievementScroll/AchievementScroll'
import UsernameSearchBar from 'src/components/UsernameSearchBar'

import { useFilter } from 'src/providers/filters'

const FilterBar = ({
  defaultParams,
  hideOnMobile = false,
  showScrollbar = false,
  extendAchievements = false,
}) => {
  const { filter, setFilter, resetFilter } = useFilter()

  const [title, setTitle] = useState(filter.title)
  const [timeControl, setTimeControl] = useState(filter.timeControl)
  const [moveCount, setMoveCount] = useState(filter.moveCount)
  const [achievements, setAchievements] = useState(filter.achievements || [])
  const [opening, setOpening] = useState(
    defaultParams?.opening || filter.opening
  )
  const [color, setColor] = useState(filter.color)
  const [termination, setTermination] = useState(
    defaultParams?.termination || filter.termination
  )
  const [rarity, setRarity] = useState(filter.rarity)
  const [sale, setSale] = useState(defaultParams?.sale || filter.sale)
  const [outcome, setOutcome] = useState(
    defaultParams?.outcome || filter.outcome
  )
  const [lowPrice, setLowPrice] = useState(filter.lowPrice) // must be initialized to a string to control the input from initial render
  const [highPrice, setHighPrice] = useState(filter.highPrice)

  const updateAchievements = (data) => {
    anyValues(data, achievements, setAchievements)
  }

  const updateOutcomes = (data) => {
    anyValues(data, outcome, setOutcome)
  }

  const updateSale = (data) => {
    anyValues(data, sale, setSale)
  }

  const updateFilter = () => {
    setFilter('filter', {
      ...(achievements?.length && { achievements }),
      ...(opening && opening !== defaultParams?.opening && { opening }),
      ...(color && { color }),
      ...(title && { title }),
      ...(timeControl && { timeControl }),
      ...(termination &&
        termination !== defaultParams?.termination && { termination }),
      ...(outcome?.length && outcome !== defaultParams?.outcome && { outcome }),
      ...(moveCount && { moveCount }),
      ...(rarity && { rarity }),
      ...(sale?.length && sale !== defaultParams?.sale && { sale }),
      ...(lowPrice && { lowPrice }),
      ...(highPrice && { highPrice }),
    })
  }
  const onReset = () => {
    setAchievements([])
    setOpening()
    setColor()
    setTitle()
    setTimeControl()
    setTermination(defaultParams?.termination)
    setOutcome(defaultParams?.outcome)
    setMoveCount()
    setRarity()
    setSale(defaultParams?.sale)
    setLowPrice() // must be initialized to a string to control the input from initial render
    setHighPrice()

    resetFilter()
  }

  React.useEffect(() => {
    updateFilter()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    achievements,
    opening,
    color,
    title,
    timeControl,
    termination,
    outcome,
    moveCount,
    rarity,
    sale,
    lowPrice,
    highPrice,
  ])

  return (
    <div className="filterBarWrapper" data-hide-on-mobile={hideOnMobile}>
      <div className="filterBar" data-show-scrollbar={showScrollbar}>
        <div className="resetRow">
          <button className="reset" onClick={onReset}>
            Reset
          </button>
        </div>

        <div className="dropdownRowSpacing">
          <h4 style={{ marginBottom: `0.5em` }}>Username</h4>
          <UsernameSearchBar />
        </div>
        <div className="dropdownRowSpacing">
          <Dropdown
            category={'Opening'}
            options={filters.openingList.map((opening) => opening.name)}
            queryFilterFunction={setOpening}
            queryFilter={opening}
          />
        </div>
        <div className="dropdownRowSpacing">
          <Dropdown
            category={'Rarity'}
            options={filters.rarityList}
            queryFilterFunction={setRarity}
            queryFilter={rarity}
          />
        </div>
        <div className="dropdownRowSpacing">
          <FilterCheckbox
            category={'Sale'}
            options={filters.saleList}
            queryFilterFunction={updateSale}
            queryFilter={sale}
          />
        </div>
        <div className="priceRowWrapper">
          <h4>Price Range</h4>
          <div className="priceRow">
            <FilterPriceInput value={lowPrice} setValue={setLowPrice} />
            <span>to</span>
            <FilterPriceInput value={highPrice} setValue={setHighPrice} />
          </div>
        </div>
        <div className="dropdownRowSpacing">
          <FilterCheckbox
            category={'Outcome'}
            options={filters.outcomeList}
            queryFilterFunction={updateOutcomes}
            queryFilter={outcome}
          />
        </div>
        <div className="dropdownRowSpacing">
          <Dropdown
            category={'Termination'}
            options={filters.terminationList.map(
              (termination) => termination.name
            )}
            queryFilterFunction={setTermination}
            queryFilter={termination}
          />
        </div>
        <div className="dropdownTwoElementRow">
          <Dropdown
            category={'Time'}
            options={filters.timeControlList.map((time) => time.name)}
            queryFilterFunction={setTimeControl}
            queryFilter={timeControl}
          />
          <Dropdown
            category={'Move Count'}
            options={filters.moveCountList.map((moves) => moves.name)}
            queryFilterFunction={setMoveCount}
            queryFilter={moveCount}
          />
        </div>
        <div className="dropdownRowSpacing">
          <FilterCheckbox
            category={'Master Title'}
            options={filters.titleList}
            // options={filters.titleList.map((title) => title.toUpperCase())}
            queryFilterFunction={setTitle}
            queryFilter={title}
            deselect={true}
          />
        </div>
        <div className="dropdownRow">
          <h4 style={{ marginLeft: `1em`, marginBottom: `0.5em` }}>
            Achievements
          </h4>
          <AchievementScroll
            achievements={filters.achievementList.sort(
              (a, b) => b.points - a.points
            )}
            queryFilterFunction={updateAchievements}
            queryFilter={achievements}
            extendScrollArea={extendAchievements}
            showScrollbar={showScrollbar}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterBar
