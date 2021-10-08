import styles from './FilterCheckbox.module.scss'
import { useState } from 'react'

const FilterCheckbox = (props) => {
  const [currentSelection, setCurrentSelection] = useState()
  const options = props.options

  const handleSelectionUpdate = (data) => {
    setCurrentSelection(data)
  }

  return (
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
  )
}

export default FilterCheckbox

const FilterListItem = (props) => {
  return (
    <>
      {props.isSelected ? (
        <button
          className={`${styles.filterListItem} ${styles.filterListItemSelected}`}
          onClick={() => props.clickFunction(props.label)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.clickFunction(props.label)
            }
          }}
        >
          {props.label}
        </button>
      ) : (
        <button
          className={styles.filterListItem}
          onClick={() => props.clickFunction(props.label)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.clickFunction(props.label)
            }
          }}
        >
          {props.label}
        </button>
      )}
    </>
  )
}
