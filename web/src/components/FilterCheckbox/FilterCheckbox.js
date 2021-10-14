import styles from './FilterCheckbox.module.scss'
import { useState } from 'react'

const FilterCheckbox = (props) => {
  const setCurrentSelection = props.queryFilterFunction
  const currentSelection = props.queryFilter
  const options = props.options

  const handleSelectionUpdate = (data) => {
    setCurrentSelection(data)
  }

  return (
    <div className={styles.checkBoxContainer}>
      <h4>{props.category}</h4>
      <div className={styles.checkBoxWrapper}>
        {options?.map((option, index) => {
          if (option === 'Black') {
            return (
              <>
                <BlackKingFilterListItem
                  isSelected={currentSelection == option ? true : false}
                  label={option}
                  clickFunction={handleSelectionUpdate}
                  keyVal={`${option}-${index}`}
                  key={`${option}-filterButton`}
                />
              </>
            )
          }
          if (option === 'White') {
            return (
              <>
                <WhiteKingFilterListItem
                  isSelected={currentSelection == option ? true : false}
                  label={option}
                  clickFunction={handleSelectionUpdate}
                  keyVal={`${option}-${index}`}
                  key={`${option}-filterButton`}
                />
              </>
            )
          }
          if (option === 'Either') {
            return (
              <>
                <TwoKingFilterListItem
                  isSelected={currentSelection == option ? true : false}
                  label={option}
                  clickFunction={handleSelectionUpdate}
                  keyVal={`${option}-${index}`}
                  key={`${option}-filterButton`}
                />
              </>
            )
          }
          return (
            <>
              <FilterListItem
                isSelected={currentSelection == option ? true : false}
                label={option}
                clickFunction={handleSelectionUpdate}
                keyVal={`${option}-${index}`}
                key={`${option}-filterButton`}
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
        key={props.keyVal}
      >
        {props.label}
      </button>
    </>
  )
}

const BlackKingFilterListItem = (props) => {
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
        key={props.keyVal}
      >
        <img src="/icons/BK.svg" alt={props.label} />
      </button>
    </>
  )
}

const WhiteKingFilterListItem = (props) => {
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
        key={props.keyVal}
      >
        <img src="/icons/WK.svg" alt={props.label} />
      </button>
    </>
  )
}

const TwoKingFilterListItem = (props) => {
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
        key={props.keyVal}
      >
        <img src="/icons/BK.svg" alt={props.label} />
        <img src="/icons/WK.svg" alt={props.label} />
      </button>
    </>
  )
}
