import { Head } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/Marketplace/SearchBar/SearchBar'
import FilterBar from '../../components/FilterBar/FilterBar'
// import { filters } from './Filters'
// import { anyValues, oneValue } from './Logic'

const Marketplace = () => {
  const [searchValue, setSearchValue] = useState('') // string search
  const [queryParameters, setQueryParameters] = useState({}) // for use in a 'makeQuery' function

  // const [searchResults, setSearchResults] = useState() //expects an array

  const makeQuery = (_query) => {
    // insert logic to handle request here
    // console.log(query) // uncomment to see how the query is structured
  }

  // pass QueryParameters as a dependency to only perform this logic when it updates
  useEffect(() => {
    makeQuery(queryParameters)
  }, [queryParameters])

  useEffect(() => {
    // append search value to url
  }, [searchValue])

  const updateSearchString = (value) => {
    setSearchValue(value)
  }

  return (
    <>
      <Head>
        <title>Treasure Chess | Marketplace</title>
      </Head>
      <h1 className="font-bold">Treasure Chess Marketplace</h1>
      <SearchBar
        value={searchValue}
        changeHandler={(d) => updateSearchString(d)}
      />
      <FilterBar
        filterQuery={queryParameters}
        setFilterQuery={(d) => setQueryParameters(d)} // d for data
      />
      {/* <TreasuresWithFilterCell {...queryParameters} /> */}
    </>
  )
}

export default Marketplace
