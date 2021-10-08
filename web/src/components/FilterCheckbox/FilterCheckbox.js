import styles from './FilterCheckbox.module.scss'
import { useState } from 'react'

const FilterCheckbox = (props) => {
  const [currentSelection, setCurrentSelection] = useState()
  const options = props.options

  const handleSelectionUpdate = (data) => {
    setCurrentSelection(data)
  }

  return (
    <div className={styles.checkBoxContainer}>
      <h4>{props.category}</h4>
      <div className={styles.checkBoxWrapper}>
        {options?.map((option, index) => {
          return (
            <>
              <FilterListItem
                isSelected={currentSelection == option ? true : false}
                label={option}
                clickFunction={handleSelectionUpdate}
                key={index}
              />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default FilterCheckbox

const FilterListItem = (props) => {
  return (
    <>
      <button
        className={
          props.isSelected
            ? `${styles.filterListItem} ${styles.filterListItemSelected}`
            : `${styles.filterListItem}`
        }
        onClick={() => props.clickFunction(props.label)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            props.clickFunction(props.label)
          }
        }}
        onMouseLeave={(e) => {
          e.target.blur()
        }}
      >
        {props.label}
      </button>
    </>
  )
}
