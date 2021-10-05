import styles from './FilterButton.module.scss';
/**
 * This button is used to both Trigger and Filter searches
 * @param {String} label The label the button displays
 * @param {Function} function Pass a function via props to be triggered on click
 * Renders a styled interactive button that has a Click event listener
 */
const FilterButton = ({label, clickFunction}) => {

	return (
		<button className={styles.filterButton} onClick={() => clickFunction()}>{label}</button>
	)
}

export default FilterButton