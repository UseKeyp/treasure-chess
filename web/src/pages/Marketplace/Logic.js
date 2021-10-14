/**
 * This function allows an array to be populated with exactly two
 * values, where if a new value is introduced the first value is removed, and
 * if a value that already exists in the array is passed, it is removed from the array.
 * This expects to be written in a page function that has a useState hook to control
 * the values.
 * @param {*} value The new value to be added
 * @param {Array} filterArray The stateful array being changed
 * @param {Function} setFilterArray The setting function for that stateful array
 */
export const twoValues = (value, filterArray, setFilterArray) => {
	if (filterArray[0] === undefined) {
		console.log('Rating Filter 0 is undefined');
		setFilterArray([value]);
	}
	if (filterArray[0] !== undefined) {
		console.log('Rating Filter 0 is not undefined');
		// filter has at least one element
		if (filterArray[1] === undefined) {
			console.log('Rating Filter 1 is undefined');
			// filter has exactly one element
			if (filterArray[0] == value) {
				console.log('Rating Filter 0 matches the new value');
				// The one element that exists has just been selected, clear the array
				setFilterArray([]);
			}
			if (filterArray[0] !== value) {
				console.log('Rating Filter 0 does not match the new value');
				// otherwise, add the value
				setFilterArray(v => {
					return [...v, value];
				});
			}
		}
		if (filterArray[1] !== undefined) {
			console.log('Rating Filter 1 is not undefined');
			// filter has two elements
			setFilterArray((v) => {
				if (value === v[0]) {
					console.log('New value matches first filter');
					return [v[1]];
				}
				if (value === v[1]) {
					console.log('New value matches second filter');
					return [v[0]];
				}
				if (value !== v[0] && value !== v[1]) {
					console.log('New Value matches neither filter');
					let newList = [...v];
					newList[0] = newList[1];
					newList[1] = value;
					return newList;
				}
			});
		}
	}
}

/**
 * This function allows an array to be populated with an arbitrary length
 * of values, but if a value already exists in the array it is removed at it's index instead
 * of being added a second time.
 * This expects to be written in a page function that has a useState hook to control
 * the values.
 * @param {*} value The new value to be added
 * @param {Array} filterArray The stateful array being changed
 * @param {Function} setFilterArray The setting function for that stateful array
 */
export const anyValues = (value, filterArray, setFilterArray) => {
	if (filterArray[0] === undefined) {
		// if the achievement filter has an undefined value at the start,
		// it has just been initialized as empty and a new array can be set
		// to the achievement filter value.
		setFilterArray([value]);
	} else {
		setFilterArray((v) => {
			// if the array is NOT empty, allow the user to toggle achievement filters.
			// this filter removes filters that exactly match the recently toggled achievement.
			let newList = v.filter(filter => value !== filter);
			// if that new list is undefined, that means one filter was toggled
			// and the datatype must be reinitialized to an empty array.
			if (newList === undefined) {
				return [];
			}
			// if the newList is not undefined, and we removed no values, we can add the value.
			// I don't know why I have to stringify these... that's javascript for ya
			if (newList.toString() == v.toString()) {
				newList = [...v, value];
			}
			// return the new list.
			return newList;
		})
	}
}

/**
 * This function allows an array to be populated with exactly one value.
 * If a new value is added, the previous is replaced.
 * If the same value is added, it is removed.
 * This expects to be written in a page function that has a useState hook to control
 * the values.
 * @param {*} value The new value to be added
 * @param {Array} filterArray The stateful array being changed
 * @param {Function} setFilterArray The setting function for that stateful array
 */
export const oneValue = (value, filterArray, setFilterArray) => {
	if (filterArray[0] === undefined) {
		setFilterArray([value]);
	} else {
		setFilterArray((v) => {
			let newList = v.filter(filter => value !== filter);
			if (newList === undefined) {
				return [];
			}
			// in THIS FUNCTION filters are mutually exclusive, so we just replace the value.
			if (newList.toString() == v.toString()) {
				newList = [value];
			}
			return newList;
		})
	}
}