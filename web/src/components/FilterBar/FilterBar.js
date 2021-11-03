import { useState } from 'react'
import filters from '@common/filters'

import styles from './FilterBar.module.scss'

import { anyValues } from './Logic'
import FilterCheckbox from 'src/components/FilterCheckbox/FilterCheckbox'
import FilterPriceInput from 'src/components/FilterPriceInput/FilterPriceInput'
import Dropdown from 'src/components/Dropdown/Dropdown'
import AchievementScroll from 'src/components/AchievementScroll/AchievementScroll'

const FilterBar = ({ filter, setFilter }) => {
  const [title, setTitle] = useState(filter.title)
  const [timeControl, setTimeControl] = useState(filter.timeControl)
  const [moveCount, setMoveCount] = useState(filter.moveCount)

  const [achievements, setAchievements] = useState(filter.achievements || [])
  const [opening, setOpening] = useState(filter.opening)
  const [color, setColor] = useState(filter.color)
  const [termination, setTermination] = useState(filter.termination)
  const [rarity, setRarity] = useState(filter.rarity)
  const [sale, setSale] = useState(filter.sale)
  const [outcome, setOutcome] = useState(filter.outcome)
  const [lowPrice, setLowPrice] = useState(filter.lowPrice) // must be initialized to a string to control the input from initial render
  const [highPrice, setHighPrice] = useState(filter.highPrice)

  const updateAchievements = (data) => {
    anyValues(data, achievements, setAchievements)
  }

  const updateFilter = () => {
    setFilter({
      ...(achievements?.length && { achievements }),
      ...(opening && { opening }),
      ...(color && { color }),
      ...(title && { title }),
      ...(timeControl && { timeControl }),
      ...(termination && { termination }),
      ...(outcome && { outcome }),
      ...(moveCount && { moveCount }),
      ...(rarity && { rarity }),
      ...(sale && { sale }),
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
    setTermination()
    setOutcome()
    setMoveCount()
    setRarity()
    setSale()
    setLowPrice() // must be initialized to a string to control the input from initial render
    setHighPrice()

    updateFilter()
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
    <div className={styles.filterBar}>
      <div className={styles.resetRow}>
        <button className={styles.reset} onClick={onReset}>
          Reset
        </button>
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Opening'}
          options={filters.openingList}
          queryFilterFunction={setOpening}
          queryFilter={opening}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Rarity'}
          options={filters.rarityList}
          queryFilterFunction={setRarity}
          queryFilter={rarity}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Sale'}
          options={filters.saleList}
          queryFilterFunction={setSale}
          queryFilter={sale}
        />
      </div>
      <div className={styles.priceRowWrapper}>
        <h4>Price Range</h4>
        <div className={styles.priceRow}>
          <FilterPriceInput value={lowPrice} setValue={setLowPrice} />
          <span>to</span>
          <FilterPriceInput value={highPrice} setValue={setHighPrice} />
        </div>
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Outcome'}
          options={filters.outcomeList}
          queryFilterFunction={setOutcome}
          queryFilter={outcome}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Termination'}
          options={filters.terminationList}
          queryFilterFunction={setTermination}
          queryFilter={termination}
        />
      </div>
      <div className={styles.dropdownTwoElementRow}>
        <Dropdown
          category={'Time'}
          options={filters.timeControlList}
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
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Master Title'}
          options={filters.titleList.map((title) => title.name)}
          queryFilterFunction={setTitle}
          queryFilter={title}
        />
      </div>
      <div className={styles.dropdownRow}>
        <h4 style={{ marginLeft: `1em` }}>Achievements</h4>
        <AchievementScroll
          achievements={filters.achievementList}
          queryFilterFunction={updateAchievements}
          queryFilter={achievements}
        />
      </div>
    </div>
  )
}

export default FilterBar
