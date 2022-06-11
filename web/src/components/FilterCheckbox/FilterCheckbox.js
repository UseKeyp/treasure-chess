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
    <div className="checkBoxContainer">
      <h4>{props.category}</h4>
      <div className="checkBoxWrapper">
        {options?.map((option, index) => {
          return (
            <FilterListItem
              isSelected={currentSelection === option}
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
            ? `filterListItem filterListItemSelected`
            : `filterListItem`
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
        {props.label === 'black' ? (
          <img src="/icons/BK.svg" alt={props.label} />
        ) : props.label === 'white' ? (
          <img src="/icons/WK.svg" alt={props.label} />
        ) : props.label === 'draw' ? (
          <>
            <img src="/icons/BK.svg" alt={props.label} />
            <img src="/icons/WK.svg" alt={props.label} />
          </>
        ) : (
          props.label
        )}
      </button>
    </>
  )
}
