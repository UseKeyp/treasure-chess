import { Head } from '@redwoodjs/web'
import { gql, useQuery, useLazyQuery } from '@redwoodjs/web'
import { useState } from 'react'
import SearchBar from '../../components/Marketplace/SearchBar/SearchBar'
import FilterBar from '../../components/FilterBar/FilterBar'
import {
  filters
} from './Filters'
import { anyValues, oneValue } from './Logic'

const Marketplace = () => {
  const [searchValue, setSearchValue] = useState()
  const [queryParameters, setQueryParameters] = useState({}) // for use in a 'makeQuery' function

  const [achievementFilter, setAchievementFilter] = useState([])
  const [openerFilter, setOpenerFilter] = useState([])
  const [colorFilter, setColorFilter] = useState([])
  const [ratingFilter, setRatingFilter] = useState([])
  const [titleFilter, setTitleFilter] = useState([])
  const [timeControlFilter, setTimeControlFilter] = useState([])
  const [terminationFilter, setTerminationFilter] = useState([])
  const [outcomeFilter, setOutcomeFilter] = useState([])
  const [moveCountFilter, setMoveCountFilter] = useState([])

  const setFunctions = {
    setAchievementFilter,
    setOpenerFilter,
    setColorFilter,
    setRatingFilter,
    setTitleFilter,
    setTimeControlFilter,
    setTerminationFilter,
    setOutcomeFilter,
    setMoveCountFilter
  }

  const stateFilters = {
    achievementFilter,
    openerFilter,
    colorFilter,
    ratingFilter,
    titleFilter,
    timeControlFilter,
    terminationFilter,
    outcomeFilter,
    moveCountFilter,
  }

  const [searchResults, setSearchResults] = useState() //expects an array

  const makeQuery = (query) => {
    console.log(query);
  }

  // pass each filter as a dependency array to wait
  // for state to update before making a query
  React.useEffect(() => {
    let query = {}
    query.searchString = searchValue
    query.achievements = achievementFilter
    query.openers = openerFilter
    query.color = colorFilter
    query.rating = ratingFilter
    query.title = titleFilter
    query.timeControl = timeControlFilter
    query.termination = terminationFilter
    query.outcome = outcomeFilter
    query.moveCount = moveCountFilter
    setQueryParameters(query)
  }, [
    achievementFilter,
    openerFilter,
    colorFilter,
    ratingFilter,
    titleFilter,
    timeControlFilter,
    terminationFilter,
    outcomeFilter,
    moveCountFilter,
    searchValue,
  ])

  // pass QueryParameters as a dependency to only perfomr this logic when it updates
  React.useEffect(() => {
    makeQuery(queryParameters)
  }, [queryParameters])


  const updateSearchString = (value) => {
    setSearchValue(value)
  }

  return (
    <>
      <Head>
        <title>Treasure Chess | Marketplace</title>
      </Head>
      <h1 className="font-bold">Treasure Chess Marketplace</h1>
      <SearchBar value={searchValue} changeHandler={updateSearchString} />
      <FilterBar />
      <h2>Query Parameters:</h2>
      {achievementFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Achievements:</h3>
          {achievementFilter.map((achievement, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {achievement}
              </h4>
            )
          })}
        </>
      ) : null}
      {openerFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Opening Moves:</h3>
          {openerFilter.map((opener, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {opener}
              </h4>
            )
          })}
        </>
      ) : null}
      {colorFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Color:</h3>
          {colorFilter.map((color, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {color}
              </h4>
            )
          })}
        </>
      ) : null}
      {ratingFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Titles:</h3>
          {ratingFilter.map((rating, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {rating}
              </h4>
            )
          })}
        </>
      ) : null}
      {titleFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Titles:</h3>
          {titleFilter.map((title, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {title}
              </h4>
            )
          })}
        </>
      ) : null}
      {ratingFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Player Ratings:</h3>
          {ratingFilter.map((item, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {item}
              </h4>
            )
          })}
        </>
      ) : null}
      {timeControlFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Time Control:</h3>
          {timeControlFilter.map((item, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {item}
              </h4>
            )
          })}
        </>
      ) : null}
      {terminationFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Termination:</h3>
          {timeControlFilter.map((item, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {item}
              </h4>
            )
          })}
        </>
      ) : null}
      {outcomeFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Winner: </h3>
          {outcomeFilter.map((item, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {item}
              </h4>
            )
          })}
        </>
      ) : null}
      {moveCountFilter[0] !== undefined ? (
        <>
          <h3 style={{ fontSize: '1.5rem' }}>Game Length: </h3>
          {moveCountFilter.map((item, index) => {
            return (
              <h4
                style={{ fontSize: `1rem`, lineHeight: `1`, margin: `1ex 0` }}
                key={index}
              >
                {item} Turns
              </h4>
            )
          })}
        </>
      ) : null}
      {/* <TreasuresWithFilterCell {...queryParameters} /> */}
    </>
  )
}

export default Marketplace
