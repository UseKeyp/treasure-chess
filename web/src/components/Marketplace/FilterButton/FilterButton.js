/**
 * This button is used to both Trigger and Filter searches
 * @param {String} label The label the button displays
 * @param {Function} clickFunction Pass a function via props to be triggered on click
 * @param {Boolean} isActive Supply a boolean indicating that this filter is active
 * Renders a styled interactive button that has a Click event listener
 */
const FilterButton = ({ label, clickFunction, isActive }) => {
  return (
    <>
      {isActive ? (
        <button className="filterButton active" onClick={() => clickFunction()}>
          {label}
        </button>
      ) : (
        <button className="filterButton" onClick={() => clickFunction()}>
          {label}
        </button>
      )}
    </>
  )
}

export default FilterButton
