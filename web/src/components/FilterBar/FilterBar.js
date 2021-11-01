import { useState, useEffect } from 'react'
import styles from './FilterBar.module.scss'
import { filters } from './Filters'
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

  const updateFilter = (filter) => {
    // initalize
    let newQuery = {}
    // change 'query' data type
    if (filter.achievements?.length) newQuery.achievements = achievements
    if (filter.opening) newQuery.opener = opening
    if (filter.color) newQuery.colors = color
    if (filter.rating) newQuery.rating = rating
    if (filter.title) newQuery.title = title
    if (filter.timeControl) newQuery.timeControl = timeControl
    if (filter.termination) newQuery.termination = termination
    if (filter.outcome) newQuery.outcome = outcome
    if (filter.moveCount) newQuery.moveCount = moveCount
    if (filter.rarity) newQuery.rarity = rarity
    if (filter.sale) newQuery.sale = sale
    if (filter.lowPrice) newQuery.lowPrice = lowPrice
    if (filter.highPrice) newQuery.highPrice = highPrice
    // update query
    setFilter(newQuery)
  }

  const onReset = () => {
    update({})
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
  }

  useEffect(() => {
    updateFilter({
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
    })
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
    updateFilter(initialFilter) // Run once
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
          category={'Opener'}
          options={filters.openingList}
          queryFunction={(d) => setOpening(d)} // d for data
          query={opening}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Rarity'}
          options={filters.rarity}
          queryFunction={(d) => setRarity(d)}
          query={rarity}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Sale'}
          options={filters.sale}
          queryFunction={(d) => setSale(d)}
          queryFilter={sale}
        />
      </div>
      <div className={styles.priceRowWrapper}>
        <h4>Price Range</h4>
        <div className={styles.priceRow}>
          <FilterPriceInput value={lowPrice} setValue={(d) => setLowPrice(d)} />
          <span>to</span>
          <FilterPriceInput
            value={highPrice}
            setValue={(d) => setHighPrice(d)}
          />
        </div>
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Outcome'}
          options={filters.outcome}
          queryFilterFunction={(d) => setOutcome(d)}
          queryFilter={outcome}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Termination'}
          options={filters.terminations}
          queryFilterFunction={(d) => setTermination(d)}
          queryFilter={termination}
        />
      </div>
      <div className={styles.dropdownTwoElementRow}>
        <Dropdown
          category={'Time'}
          options={filters.timeControls}
          queryFilterFunction={(d) => setTimeControl(d)}
          queryFilter={timeControl}
        />
        <Dropdown
          category={'Move Count'}
          options={filters.moveCounts}
          queryFilterFunction={(d) => setMoveCount(d)}
          queryFilter={moveCount}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Master Title'}
          options={filters.titles.map((title) => title.label)}
          queryFilterFunction={(d) => setTitle(d)}
          queryFilter={title}
        />
      </div>
      <div className={styles.dropdownRow}>
        <h4 style={{ marginLeft: `1em` }}>Achievements</h4>
        <AchievementScroll
          achievements={filters.achievements}
          queryFilterFunction={(d) => updateAchievement(d)}
          queryFilter={achievements}
        />
      </div>
    </div>
  )
}

export default FilterBar
