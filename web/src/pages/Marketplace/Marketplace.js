import { Head } from '@redwoodjs/web'
import { gql, useQuery, useLazyQuery } from '@redwoodjs/web';
import { useState } from 'react'
import SearchBar from '../../components/Marketplace/SearchBar/SearchBar'
import FilterButton from '../../components/Marketplace/FilterButton/FilterButton'
import TreasuresWithFilterCell from '../../components/Treasure/TreasuresWithFilterCell/TreasuresWithFilterCell'
import FilterDropdown from '../../components/Marketplace/FilterDropdown/FilterDropdown';
import {
	openingList,
	achievements,
	colors,
	ratings,
	titles,
	timeControl,
	termination,
	outcome,
	moveCount
	} from './Filters';


const Marketplace = () => {

	const [searchValue, setSearchValue] = useState();
	const [queryParameters, setQueryParameters] = useState({}); // for use in a 'makeQuery' function
	const [achievementFilter, setAchievementFilter] = useState([]); // for use in queryParameters
	const [openerFilter, setOpenerFilter] = useState([]);
	const [colorFilter, setColorFilter] = useState([]);
	const [ratingFilter, setRatingFilter] = useState([]);
	const [titleFilter, setTitleFilter] = useState([]);
	const [timeControlFilter, setTimeControlFilter] = useState([]);
	const [terminationFilter, setTerminationFilter] = useState([]);
	const [outcomeFilter, setOutcomeFilter] = useState([]);
	const [moveCountFilter, setMoveCountFilter] = useState([]);

	const [searchResults, setSearchResults] = useState(); //expects an array

	const makeQuery = () => {
		//
	}

	/**
	 * A function to update a JSON object used to filter games in Marketplace
	 * @param {String} parameter The aspect that's being filtered
	 * @param {String} value The value that's being added to the query
	 * @returns Nothing, but triggers a new query
	 */
	const updateQuery = (parameter, value) => {
		switch (parameter) {
			case 'achievement':
				setQueryParameters(v => {
					v.achievements = value;
				});
			default:
				break;
		}
		// call makeQuery
	}

	const updateAchievementFilter = (value) => {
		if (achievementFilter[0] === undefined) {
			// if the achievement filter has an undefined value at the start,
			// it has just been initialized as empty and a new array can be set
			// to the achievement filter value.
			setAchievementFilter([value]);
		} else {
			setAchievementFilter((v) => {
				// if the array is NOT empty, allow the user to toggle achievement filters.
				// this map removes filters that exactly match the recently toggled achievement.
				let newList = v.map((filter) => {
					if (value !== filter) {
						return filter;
					}
				});
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
		updateQuery('achievements', achievementFilter);
	}

	const updateOpenerFilter = (value) => {
		if (openerFilter[0] === undefined) {
			setOpenerFilter([value]);
		} else {
			setOpenerFilter((v) => {
				// if the array is NOT empty, allow the user to toggle achievement filters.
				// this map removes filters that exactly match the recently toggled achievement.
				let newList = v.map((filter) => {
					if (value !== filter) {
						return filter;
					}
				});
				// if that new list is undefined, that means one filter was toggled
				// and the datatype must be reinitialized to an empty array.
				if (newList === undefined) {
					return [];
				}
				// if the newList is not undefined, and we removed no values, we can update the value.
				// in THIS FUNCTION filters are mutually exclusive, so we just replace the value.
				// I don't know why I have to stringify these... that's javascript for ya
				if (newList.toString() == v.toString()) {
					newList = [value];
				}
				// return the new list.
				return newList;
			})
		}
		updateQuery('opener', openerFilter);
	}

	const updateColorFilter = (value) => {
		//todo: update logic so no more than two values can be selected at once
		if (colorFilter[0] === undefined) {
			setColorFilter([value]);
		} else {
			setColorFilter((v) => {
				let newList = v.map((filter) => {
					if (value !== filter) {
						return filter;
					}
				});
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
		updateQuery('title', titleFilter);
	}

	const updateTitleFilter = (value) => {
		//todo: update logic so no more than two values can be selected at once
		if (titleFilter[0] === undefined) {
			setTitleFilter([value]);
		} else {
			setTitleFilter((v) => {
				let newList = v.map((filter) => {
					if (value !== filter) {
						return filter;
					}
				});
				if (newList === undefined) {
					return [];
				}
				if (newList.toString() == v.toString()) {
					newList = [...v, value];
				}
				return newList;
			})
		}
		updateQuery('title', titleFilter);
	}



  return (
    <>
      <Head>
        <title>Treasure Chess | Marketplace</title>
      </Head>
			<h1 className="font-bold">Treasure Chess Marketplace</h1>
			<SearchBar value={searchValue} changeHandler={setSearchValue} />
			<FilterDropdown label={'Achievements'}>
				<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
					{achievements.map((achievement) => {
						return <FilterButton
							label={achievement.name}
							clickFunction={() => updateAchievementFilter(achievement.name)}
							isActive={achievementFilter.includes(achievement.name)}
						/>
					})}
				</div>
			</FilterDropdown>
			<FilterDropdown label={'Opening Moves'}>
				<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
						{openingList.map((opener, index) => {
							return <FilterButton
								label={openingList[index]}
								clickFunction={() => updateOpenerFilter(openingList[index])}
								isActive={openerFilter.includes(openingList[index])}
							/>
						})}
					</div>
			</FilterDropdown>
			<FilterDropdown label={'Card Colors'}>
				<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
						{colors.map((color, index) => {
							return <FilterButton
								label={color}
								clickFunction={() => updateColorFilter(color)}
								isActive={colorFilter.includes(color)}
							/>
						})}
					</div>
			</FilterDropdown>
			<FilterDropdown label={'Titles'}>
				<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
						{titles.map((title, index) => {
							return <FilterButton
								label={title.label}
								clickFunction={() => updateTitleFilter(title.label)}
								isActive={titleFilter.includes(title.label)}
							/>
						})}
					</div>
			</FilterDropdown>

			<h2>Query Parameters:</h2>
			{(achievementFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Achievements:</h3>
					{achievementFilter.map((achievement, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{achievement}</h4>
					})}
				</>
				: null
			}
			{(openerFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Opening Moves:</h3>
					{openerFilter.map((opener, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{opener}</h4>
					})}
				</>
				: null
			}
			{(colorFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Color:</h3>
					{colorFilter.map((color, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{color}</h4>
					})}
				</>
				: null
			}
			{(titleFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Titles:</h3>
					{titleFilter.map((title, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{title}</h4>
					})}
				</>
				: null
			}
			{/* <TreasuresWithFilterCell {...queryParameters} /> */}
    </>
  )
}

export default Marketplace
