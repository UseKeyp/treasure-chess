import styles from './FilterCheckbox.module.scss'

const FilterCheckbox = (props) => {
  const setCurrentSelection = props.queryFilterFunction
  const currentSelection = props.queryFilter
  const options = props.options
  const deselect = props.deselect

  const handleSelectionUpdate = (data) => {
    deselect
      ? currentSelection === data
        ? setCurrentSelection()
        : setCurrentSelection(data)
      : setCurrentSelection(data)
  }

  return (
    <div className={styles.checkBoxContainer}>
      <h4>{props.category}</h4>
      <div className={styles.checkBoxWrapper}>
        {options?.map((option, index) => {
          if (option === 'black') {
            return (
              <BlackKingFilterListItem
                isSelected={currentSelection?.includes(option)}
                clickFunction={setCurrentSelection}
                label={option}
                keyVal={`${option}-${index}`}
                key={`${option}-filterButton`}
              />
            )
          }
          if (option === 'white') {
            return (
              <WhiteKingFilterListItem
                isSelected={currentSelection?.includes(option)}
                clickFunction={setCurrentSelection}
                label={option}
                keyVal={`${option}-${index}`}
                key={`${option}-filterButton`}
              />
            )
          }
          if (option === 'draw') {
            return (
              <TwoKingFilterListItem
                isSelected={currentSelection?.includes(option)}
                clickFunction={setCurrentSelection}
                label={option}
                keyVal={`${option}-${index}`}
                key={`${option}-filterButton`}
              />
            )
          }
          return (
            <FilterListItem
              isSelected={currentSelection?.includes(option)}
              label={option}
              clickFunction={handleSelectionUpdate}
              keyVal={`${option}-${index}`}
              key={`${option}-filterButton`}
            />
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
