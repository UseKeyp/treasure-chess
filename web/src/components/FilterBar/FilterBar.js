import { useState, useEffect } from 'react'
import styles from './FilterBar.module.scss'
import { filters } from './Filters'
import { anyValues } from './Logic'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import FilterPriceInput from '../FilterPriceInput/FilterPriceInput'
import Dropdown from '../Dropdown/Dropdown'
import AchievementScroll from '../AchievementScroll/AchievementScroll'

const FilterBar = ({ setFilterQuery }) => {
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

  const clearFilters = () => {
    setAchievementFilter()
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
    setLowPrice()
    setHighPrice()
  }

  // update query
  useEffect(() => {
    // initalize
    let newQuery = {}
    // change 'query' data type
    setFilterQuery('')
    // populate
    newQuery.achievements = achievementFilter
    newQuery.opener = openingFilter
    newQuery.colors = colorFilter
    newQuery.rating = ratingFilter
    newQuery.title = titleFilter
    newQuery.timeControl = timeControlFilter
    newQuery.termination = terminationFilter
    newQuery.outcome = outcomeFilter
    newQuery.moveCount = moveCountFilter
    newQuery.rarity = rarityFilter
    newQuery.sale = saleFilter
    newQuery.lowPrice = lowPrice
    newQuery.highPrice = highPrice
    // update query
    setFilterQuery(newQuery)
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
  // eslint is complaining that 'props' isn't in the dependency array - eslint is wrong, don't add props, that causes an infinite loop that react doesn't catch

  return (
    <div className={styles.filterBar}>
      <div className={styles.resetRow}>
        <button className={styles.reset} onClick={() => clearFilters()}>
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
          options={['Common', 'Uncommon', 'Rare', 'Legendary', 'Exotic']}
          queryFilterFunction={(d) => setRarityFilter(d)}
          queryFilter={rarityFilter}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Sale'}
          options={['All', 'For Sale', 'Unlisted']}
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
          options={['Black', 'White', 'Either']}
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
