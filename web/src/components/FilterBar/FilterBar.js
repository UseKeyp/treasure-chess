import { useState, useEffect } from 'react'
import styles from './FilterBar.module.scss'
import { filters } from './Filters'
import { anyValues, oneValue } from './Logic'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import FilterPriceInput from '../FilterPriceInput/FilterPriceInput'
import Dropdown from '../Dropdown/Dropdown'
import AchievementScroll from '../AchievementScroll/AchievementScroll'

const FilterBar = (props) => {
  const [achievementFilter, setAchievementFilter] = useState()
  const [openingFilter, setOpeningFilter] = useState()
  const [colorFilter, setColorFilter] = useState()
  const [ratingFilter, setRatingFilter] = useState()
  const [titleFilter, setTitleFilter] = useState()
  const [timeControlFilter, setTimeControlFilter] = useState()
  const [terminationFilter, setTerminationFilter] = useState()
  const [outcomeFilter, setOutcomeFilter] = useState()
  const [moveCountFilter, setMoveCountFilter] = useState()

  return (
    <div className={styles.filterBar}>
      <div className={styles.resetRow}>
        <button className={styles.reset}>Reset</button>
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown category={'Opener'} options={filters.openingList} />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown
          category={'Rarity'}
          options={['Common', 'Uncommon', 'Rare', 'Legendary', 'Exotic']}
        />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Sale'}
          options={['All', 'For Sale', 'Unlisted']}
        />
      </div>
      <div className={styles.priceRowWrapper}>
        <h4>Price Range</h4>
        <div className={styles.priceRow}>
          <FilterPriceInput />
          <span>to</span>
          <FilterPriceInput />
        </div>
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Outcome'}
          options={['Black', 'White', 'Either']}
        />
      </div>
      <div className={styles.dropdownRow}>
        <Dropdown category={'Termination'} options={filters.terminations} />
      </div>
      <div className={styles.dropdownTwoElementRow}>
        <Dropdown category={'Time'} options={filters.timeControls} />
        <Dropdown category={'Move Count'} options={filters.moveCounts} />
      </div>
      <div className={styles.dropdownRow}>
        <FilterCheckbox
          category={'Master Title'}
          options={filters.titles.map((title) => title.label)}
        />
      </div>
      <div className={styles.dropdownRow}>
        <h4 style={{ marginLeft: `1em` }}>Achievements</h4>
        <AchievementScroll achievements={filters.achievements} />
      </div>
    </div>
  )
}

export default FilterBar
