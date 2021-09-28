import { Head } from '@redwoodjs/web'
import { gql, useQuery, useLazyQuery } from '@redwoodjs/web';
import { useState } from 'react'
import SearchBar from '../../components/Marketplace/SearchBar/SearchBar'
import FilterButton from '../../components/Marketplace/FilterButton/FilterButton'
// import TreasuresWithFilterCell from '../../components/Treasure/TreasuresWithFilterCell/TreasuresWithFilterCell'
import FilterDropdown from '../../components/Marketplace/FilterDropdown/FilterDropdown';
import {
	openingList,
	achievements,
	colors,
	ratings,
	titles,
	timeControls,
	terminations,
	outcomes,
	moveCounts
} from './Filters';
import {
	anyValues,
	oneValue,
	twoValues
} from './Logic';


const Marketplace = () => {

	const [searchValue, setSearchValue] = useState();
	const [queryParameters, setQueryParameters] = useState({}); // for use in a 'makeQuery' function

	const [achievementFilter, setAchievementFilter] = useState([]);
	const [openerFilter, setOpenerFilter] = useState([]);
	const [colorFilter, setColorFilter] = useState([]);
	const [ratingFilter, setRatingFilter] = useState([]);
	const [titleFilter, setTitleFilter] = useState([]);
	const [timeControlFilter, setTimeControlFilter] = useState([]);
	const [terminationFilter, setTerminationFilter] = useState([]);
	const [outcomeFilter, setOutcomeFilter] = useState([]);
	const [moveCountFilter, setMoveCountFilter] = useState([]);

	const [searchResults, setSearchResults] = useState(); //expects an array

	const makeQuery = (query) => {
		console.log(query);
	}

	// pass each filter as a dependency array to wait
	// for state to update before making a query
	React.useEffect(() => {
		let query = {};
		query.achievements = achievementFilter;
		query.openers = openerFilter;
		query.color = colorFilter;
		query.rating = ratingFilter;
		query.title = titleFilter;
		query.timeControl = timeControlFilter;
		query.termination = terminationFilter;
		query.outcome = outcomeFilter;
		query.moveCount = moveCountFilter;
		setQueryParameters(query);
	}, [achievementFilter, openerFilter, colorFilter, ratingFilter, titleFilter, timeControlFilter, terminationFilter, outcomeFilter, moveCountFilter]);

	// pass QueryParameters as a dependency to only perfomr this logic when it updates
	React.useEffect(() => {
		makeQuery(queryParameters);
	},[queryParameters]);

	const updateAchievementFilter = (value) => {
		anyValues(value, achievementFilter, setAchievementFilter);
		// updateQuery('achievements', achievementFilter);
	}

	const updateOpenerFilter = (value) => {
		oneValue(value, openerFilter, setOpenerFilter);
		// updateQuery('opener', openerFilter);
	}

	const updateColorFilter = (value) => {
		oneValue(value, colorFilter, setColorFilter);
		// updateQuery('color', colorFilter);
	}

	const updateRatingFilter = (value) => {
		anyValues(value, ratingFilter, setRatingFilter);
		// updateQuery('rating', ratingFilter);
	}

	const updateTitleFilter = (value) => {
		anyValues(value, titleFilter, setTitleFilter);
		// updateQuery('title', titleFilter);
	}

	const updateTimeControlFilter = (value) => {
		anyValues(value, timeControlFilter, setTimeControlFilter);
		// updateQuery('timeControl', timeControlFilter);
	}

	const updateTerminationFilter = (value) => {
		anyValues(value, terminationFilter, setTerminationFilter);
		// updateQuery('termination', terminationFilter);
	}

	const updateOutcomeFilter = (value) => {
		anyValues(value, outcomeFilter, setOutcomeFilter);
		// updateQuery('outcome', outcomeFilter);
	}

	const updateMoveCountFilter = (value) => {
		anyValues(value, moveCountFilter, setMoveCountFilter);
		// updateQuery('moveCount', moveCountFilter);
	}


  return (
    <>
      <Head>
        <title>Treasure Chess | Marketplace</title>
      </Head>
			<h1 className="font-bold">Treasure Chess Marketplace</h1>
			<SearchBar value={searchValue} changeHandler={setSearchValue} />
			<FilterDropdown label={'Filters'}>
				<div style={{marginLeft: '1rem'}}>
				<FilterDropdown label={'Achievements'}>
					<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
						{achievements.map((achievement, index) => {
							return <FilterButton
								key={`achievement-${index}`}
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
									key={`opener-${index}`}
									label={opener}
									clickFunction={() => updateOpenerFilter(opener)}
									isActive={openerFilter.includes(opener)}
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
				<FilterDropdown label={'Player Ranks'}>
				<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
							{ratings.map((rating) => {
								return <FilterButton
									label={rating}
									clickFunction={() => updateRatingFilter(rating)}
									isActive={ratingFilter.includes(rating)}
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
				<FilterDropdown label={'Time Control'}>
					<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
							{timeControls.map((timeControl, index) => {
								return <FilterButton
									key={`timeControl-${index}`}
									label={timeControl.label}
									clickFunction={() => updateTimeControlFilter(timeControl.label)}
									isActive={timeControlFilter.includes(timeControl.label)}
								/>
							})}
						</div>
				</FilterDropdown>
				<FilterDropdown label={'Termination'}>
					<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
							{terminations.map((termination, index) => {
								return <FilterButton
									key={`termination-${index}`}
									label={termination}
									clickFunction={() => updateTerminationFilter(termination)}
									isActive={terminationFilter.includes(termination)}
								/>
							})}
						</div>
				</FilterDropdown>
				<FilterDropdown label={'Winner'}>
					<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
							{outcomes.map((outcome, index) => {
								return <FilterButton
									key={`outcome-${index}`}
									label={outcome.label}
									clickFunction={() => updateOutcomeFilter(outcome.label)}
									isActive={outcomeFilter.includes(outcome.label)}
								/>
							})}
						</div>
				</FilterDropdown>
				<FilterDropdown label={'Game Length'}>
					<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '100vw', justifyContent: 'flex-start'}}>
							{moveCounts.map((moveCount, index) => {
								return <FilterButton
									key={`length-${index}`}
									label={`${moveCount} turns`}
									clickFunction={() => updateMoveCountFilter(moveCount)}
									isActive={moveCountFilter.includes(moveCount)}
								/>
							})}
						</div>
				</FilterDropdown>
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
			{(ratingFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Titles:</h3>
					{ratingFilter.map((rating, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{rating}</h4>
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
			{(ratingFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Player Ratings:</h3>
					{ratingFilter.map((item, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{item}</h4>
					})}
				</>
				: null
			}
			{(timeControlFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Time Control:</h3>
					{timeControlFilter.map((item, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{item}</h4>
					})}
				</>
				: null
			}
			{(terminationFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Termination:</h3>
					{timeControlFilter.map((item, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{item}</h4>
					})}
				</>
				: null
			}
			{(outcomeFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Winner: </h3>
					{outcomeFilter.map((item, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{item}</h4>
					})}
				</>
				: null
			}
			{(moveCountFilter[0] !== undefined) ?
				<>
					<h3 style={{fontSize: '1.5rem'}}>Game Length: </h3>
					{moveCountFilter.map((item, index) => {
						return <h4 style={{fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0`}}key={index}>{item} Turns</h4>
					})}
				</>
				: null
			}
			{/* <TreasuresWithFilterCell {...queryParameters} /> */}
    </>
  )
}

export default Marketplace
