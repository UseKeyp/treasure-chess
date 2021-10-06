import { useState, useEffect } from 'react'
import styles from './FilterBar.module.scss'
import {
  openingList,
  achievements,
  colors,
  ratings,
  titles,
  timeControls,
  terminations,
  outcomes,
  moveCounts,
} from './Filters'
import { anyValues, oneValue } from './Logic'

const FilterBar = (props) => {

  const [achievementFilter, setAchievementFilter] = useState([])
  const setAchievementFilter = props.setAchievementFilter;
  const [openerFilter, setOpenerFilter] = useState([])
  const setOpenerFilter = props.setOpenerFilter;
  const [colorFilter, setColorFilter] = useState([])
  const setColorFilter = props.setColorFilter;
  const [ratingFilter, setRatingFilter] = useState([])
  const setColorFilter = props.setColorFilter;
  const [titleFilter, setTitleFilter] = useState([])
  const setColorFilter = props.setColorFilter;
  const [timeControlFilter, setTimeControlFilter] = useState([])
  const setColorFilter = props.setColorFilter;
  const [terminationFilter, setTerminationFilter] = useState([])
  const setColorFilter = props.setColorFilter;
  const [outcomeFilter, setOutcomeFilter] = useState([])
  const setColorFilter = props.setColorFilter;
  const [moveCountFilter, setMoveCountFilter] = useState([])



  return (
    <div className={styles.filterBar}>
      <div className={styles.resetRow}>
        <button className={styles.reset}>Reset</button>
      </div>
    </div>
  )
}

export default FilterBar
