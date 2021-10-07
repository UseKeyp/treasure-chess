import { useState, useEffect } from 'react'
import styles from './FilterBar.module.scss'
import { filters } from './Filters'
import { anyValues, oneValue } from './Logic'

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
    </div>
  )
}

export default FilterBar
