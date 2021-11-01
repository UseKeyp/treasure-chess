import { useState, useEffect } from 'react'
import styles from './FilterBar.module.scss'
import { filters } from './Filters'
import { anyValues } from './Logic'
import FilterCheckbox from 'src/components/FilterCheckbox/FilterCheckbox'
import FilterPriceInput from 'src/components/FilterPriceInput/FilterPriceInput'
import Dropdown from 'src/components/Dropdown/Dropdown'
import AchievementScroll from 'src/components/AchievementScroll/AchievementScroll'

const FilterBar = ({ initialFilter, setFilter }) => {
  const [achievementFilter, setAchievementFilter] = useState([])
  const [openingFilter, setOpeningFilter] = useState()
  const [colorFilter, setColorFilter] = useState()
  const [ratingFilter, setRatingFilter] = useState()
  const [titleFilter, setTitleFilter] = useState()
  const [timeControlFilter, setTimeControlFilter] = useState()
  const [terminationFilter, setTerminationFilter] = useState()
  const [outcomeFilter, setOutcomeFilter] = useState()
  const [moveCountFilter, setMoveCountFilter] = useState()
  const [rarityFilter, setRarityFilter] = useState()
  const [saleFilter, setSaleFilter] = useState()
  const [lowPrice, setLowPrice] = useState('') // must be initialized to a string to control the input from initial render
  const [highPrice, setHighPrice] = useState('')

  const updateAchievementFilter = (data) => {
    anyValues(data, achievementFilter, setAchievementFilter)
  }

  const updateFilter = (filter) => {
    // initalize
    let newQuery = {}
    // change 'query' data type
    if (filter.achievementFilter?.length)
      newQuery.achievements = achievementFilter
    if (filter.openingFilter) newQuery.opener = openingFilter
    if (filter.colorFilter) newQuery.colors = colorFilter
    if (filter.ratingFilter) newQuery.rating = ratingFilter
    if (filter.titleFilter) newQuery.title = titleFilter
    if (filter.timeControlFilter) newQuery.timeControl = timeControlFilter
    if (filter.terminationFilter) newQuery.termination = terminationFilter
    if (filter.outcomeFilter) newQuery.outcome = outcomeFilter
    if (filter.moveCountFilter) newQuery.moveCount = moveCountFilter
    if (filter.rarityFilter) newQuery.rarity = rarityFilter
    if (filter.saleFilter) newQuery.sale = saleFilter
    if (filter.lowPrice) newQuery.lowPrice = lowPrice
    if (filter.highPrice) newQuery.highPrice = highPrice
    // update query
    setFilter(newQuery)
  }

  const onReset = () => {
    updateFilter({})
    setAchievementFilter([])
    setOpeningFilter()
    setColorFilter()
    setRatingFilter()
    setTitleFilter()
    setTimeControlFilter()
    setTerminationFilter()
    setOutcomeFilter()
    setMoveCountFilter()
    setRarityFilter()
    setSaleFilter()
    setLowPrice('') // must be initialized to a string to control the input from initial render
    setHighPrice('')
  }

  useEffect(() => {
    updateFilter({
      achievementFilter,
      openingFilter,
      colorFilter,
      ratingFilter,
      titleFilter,
      timeControlFilter,
      terminationFilter,
      outcomeFilter,
      moveCountFilter,
      rarityFilter,
      saleFilter,
      lowPrice,
      highPrice,
    })
  }, [
    achievementFilter,
    openingFilter,
    colorFilter,
    ratingFilter,
    titleFilter,
    timeControlFilter,
    terminationFilter,
    outcomeFilter,
    moveCountFilter,
    rarityFilter,
    saleFilter,
    lowPrice,
    highPrice,
  ])

  React.useEffect(() => {
    if (!initialFilter) return
    setFilter(initialFilter) // Run once
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
          queryFilterFunction={(d) => setOpeningFilter(d)} // d for data
          queryFilter={openingFilter}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Rarity'}
          options={filters.rarity}
          queryFilterFunction={(d) => setRarityFilter(d)}
          queryFilter={rarityFilter}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Sale'}
          options={filters.sale}
          queryFilterFunction={(d) => setSaleFilter(d)}
          queryFilter={saleFilter}
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
          queryFilterFunction={(d) => setOutcomeFilter(d)}
          queryFilter={outcomeFilter}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Termination'}
          options={filters.terminations}
          queryFilterFunction={(d) => setTerminationFilter(d)}
          queryFilter={terminationFilter}
        />
      </div>
      <div className={styles.dropdownTwoElementRow}>
        <Dropdown
          category={'Time'}
          options={filters.timeControls}
          queryFilterFunction={(d) => setTimeControlFilter(d)}
          queryFilter={timeControlFilter}
        />
        <Dropdown
          category={'Move Count'}
          options={filters.moveCounts}
          queryFilterFunction={(d) => setMoveCountFilter(d)}
          queryFilter={moveCountFilter}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Master Title'}
          options={filters.titles.map((title) => title.label)}
          queryFilterFunction={(d) => setTitleFilter(d)}
          queryFilter={titleFilter}
        />
      </div>
      <div className={styles.dropdownRow}>
        <h4 style={{ marginLeft: `1em` }}>Achievements</h4>
        <AchievementScroll
          achievements={filters.achievements}
          queryFilterFunction={(d) => updateAchievementFilter(d)}
          queryFilter={achievementFilter}
        />
      </div>
    </div>
  )
}

export default FilterBar
