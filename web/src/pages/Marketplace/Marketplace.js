import { Head } from '@redwoodjs/web'
import { gql, useQuery, useLazyQuery } from '@redwoodjs/web';
import { useState } from 'react'
import SearchBar from '../../components/Marketplace/SearchBar/SearchBar'
import FilterButton from '../../components/Marketplace/FilterButton/FilterButton'
import TreasuresWithFilterCell from '../../components/Treasure/TreasuresWithFilterCell/TreasuresWithFilterCell'
import FilterDropdown from '../../components/Marketplace/FilterDropdown/FilterDropdown';


const Marketplace = () => {

	const [searchValue, setSearchValue] = useState();
	const [queryParameters, setQueryParameters] = useState({}); // for use in a 'makeQuery' function
	const [achievementFilter, setAchievementFilter] = useState([]); // for use in queryParameters

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

	const achievements = [
		{
			// index 0
			name: "Win a game",
			points: 2,
		},
		{
			// index 1
			name: "Play a game",
			points: 1,
		},
		{
			// index 2
			name: "Win a game against opponent rated 750+",
			points: 3,
		},
		{
			// index 3
			name: "Play a game against opponent rated 750+",
			points: 2,
		},
		{
			// index 4
			name: "Win a game against opponent rated 1500+",
			points: 4,
		},
		{
			// index 5
			name: "Play a game against opponent rated 1500+",
			points: 2,
		},
		{
			// index 6
			name: "Play a game against opponent rated 2000+",
			points: 3,
		},
		{
			// index 7
			name: "Win a game against opponent rated 2000+",
			points: 5,
		},
		{
			// index 8
			name: "Play a game against opponent rated 2250+",
			points: 3,
		},
		{
			// index 9
			name: "Win a game against opponent rated 2250+",
			points: 6,
		},
		{
			// index 10
			name: "Defeat an IM",
			points: 4,
		},
		{
			// index 11
			name: "Defeat a NM",
			points: 3,
		},
		{
			// index 12
			name: "Defeat a GM",
			points: 5,
		},
		{
			// index 13
			name: "Mate with a bishop",
			points: 4,
		},
		{
			// index 14
			name: "Mate with a knight",
			points: 4,
		},
		{
			// index 15
			name: "Mate with a pawn",
			points: 4,
		},
		{
			// index 16
			name: "Complete a game with more than 100 moves",
			points: 2,
		},
		{
			// index 17
			name: "Complete a game with more than 150 moves",
			points: 3,
		},
		{
			// index 18
			name: "Complete a game with more than 250 moves",
			points: 6,
		},
		{
			// index 19
			name: "Win with checkmate in less than 10 moves",
			points: 2,
		},
		{
			// index 20
			name: "Win with checkmate in <5 moves",
			points: 3,
		},
		{
			// index 21
			name: "Win with checkmate in 2 moves",
			points: 5,
		},
		{
			// index 22
			name: "Draw with a higher rated player",
			points: 2,
		},
		{
			// index 23
			name: "Queen side castle",
			points: 1,
		},
		{
			// index 24
			name: "Under-promote to a knight",
			points: 3,
		},
		{
			// index 25
			name: "Under-promote to a bishop",
			points: 5,
		},
		{
			// index 26
			name: "En Passant",
			points: 2,
		},
		{
			// index 27
			name: "Checkmate with an En Passant",
			points: 10,
		},
		{
			// index 28
			name: "Draw when opponent has a queen, without one",
			points: 4,
		},
		{
			// index 29
			name: "Draw by repetition",
			points: 1,
		},
		{
			// index 30
			name: "Defeat a higher rated player",
			points: 3,
		},
		{
			// index 31
			name: "Put opponent in check",
			points: 1,
		},
		{
			// index 32
			name: "Capture <4 pawns",
			points: 1,
		},
		{
			// index 33
			name: "Capture all pawns",
			points: 2,
		},
		{
			// index 34
			name: "Capture all knights and bishops without losing any.",
			points: 5,
		},
		{
			// index 35
			name: "Move king >20 times",
			points: 1,
		},
		{
			// index 36
			name: "Capture all pawns without losing any",
			points: 5,
		},
	];

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
							return <FilterButton label={achievement.name} clickFunction={() => updateAchievementFilter(achievement.name)} />
					})}
				</div>
			</FilterDropdown>
			<h2>Query Parameters:</h2>
			{(achievementFilter?.length >= 1) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Achievements:</h3>
					{achievementFilter.map((achievement, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{achievement}</h4>
					})}
				</>
				: null
			}
			<TreasuresWithFilterCell {...queryParameters} />
    </>
  )
}

export default Marketplace
