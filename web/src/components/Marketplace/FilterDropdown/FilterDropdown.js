import styles from './FilterDropdown.module.scss';
import { useState } from 'react';
/**
 * This component controls the visibility of multiple filter buttons
 * @param {String} label The label for this component
 * @param {Children} children Wrap this component around one or more children
 * Renders a styled interactive dropdown menu that reduces UI complexity until the user decides to interact
 */
const FilterDropdown = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => {
		setIsOpen(v => !v);
	}

	return (
		<>
			<h3 className={styles.filterDropdownLabel} onClick={() => toggleOpen()}>{(isOpen) ? '🔽' : '▶️'} {props.label}</h3>
			<div className={styles.filterDropdown}>
				{(isOpen) && props.children}
			</div>
		</>
	)
}

export default FilterDropdown