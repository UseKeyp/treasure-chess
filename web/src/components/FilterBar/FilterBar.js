import { useState } from 'react'
import { filters } from '@common/filters'

import styles from './FilterBar.module.scss'

import { anyValues } from './Logic'
import FilterCheckbox from 'src/components/FilterCheckbox/FilterCheckbox'
import FilterPriceInput from 'src/components/FilterPriceInput/FilterPriceInput'
import Dropdown from 'src/components/Dropdown/Dropdown'
import AchievementScroll from 'src/components/AchievementScroll/AchievementScroll'

const FilterBar = ({ initialFilter, setFilter }) => {
  const [achievements, setAchievements] = useState([])
  const [opening, setOpening] = useState()
  const [color, setColor] = useState()
  const [rating, setRating] = useState()
  const [title, setTitle] = useState()
  const [timeControl, setTimeControl] = useState()
  const [termination, setTermination] = useState()
  const [outcome, setOutcome] = useState()
  const [moveCount, setMoveCount] = useState()
  const [rarity, setRarity] = useState()
  const [sale, setSale] = useState()
  const [lowPrice, setLowPrice] = useState('') // must be initialized to a string to control the input from initial render
  const [highPrice, setHighPrice] = useState('')

  const updateAchievements = (data) => {
    anyValues(data, achievements, setAchievements)
  }

  const updateFilter = () => {
    setFilter({
      ...(achievements?.length && { achievements }),
      ...(opening && { opening }),
      ...(color && { color }),
      ...(rating && { rating }),
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
    setRating()
    setTitle()
    setTimeControl()
    setTermination()
    setOutcome()
    setMoveCount()
    setRarity()
    setSale()
    setLowPrice('') // must be initialized to a string to control the input from initial render
    setHighPrice('')

    updateFilter()
  }

  React.useEffect(() => {
    updateFilter()
  }, [
    achievements,
    opening,
    color,
    rating,
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

  React.useEffect(() => {
    if (!initialFilter) return
    updateFilter() // Run once
  }, [])

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
          query={opening}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Rarity'}
          options={filters.rarity}
          queryFilterFunction={setRarity}
          query={rarity}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Sale'}
          options={filters.sale}
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
          options={filters.outcome}
          queryFilterFunction={setOutcome}
          queryFilter={outcome}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Termination'}
          options={filters.terminations}
          queryFilterFunction={setTermination}
          queryFilter={termination}
        />
      </div>
      <div className={styles.dropdownTwoElementRow}>
        <Dropdown
          category={'Time'}
          options={filters.timeControls}
          queryFilterFunction={setTimeControl}
          queryFilter={timeControl}
        />
        <Dropdown
          category={'Move Count'}
          options={filters.moveCounts.map((moves) => moves.name)}
          queryFilterFunction={setMoveCount}
          queryFilter={moveCount}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Master Title'}
          options={filters.titles.map((title) => title.name)}
          queryFilterFunction={setTitle}
          queryFilter={title}
        />
      </div>
      <div className={styles.dropdownRow}>
        <h4 style={{ marginLeft: `1em` }}>Achievements</h4>
        <AchievementScroll
          achievements={filters.achievements}
          queryFilterFunction={updateAchievements}
          queryFilter={achievements}
        />
      </div>
    </div>
  )
}

export default FilterBar
