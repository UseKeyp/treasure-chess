import { useState, useEffect } from 'react'
import { useParams, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TreasuresCell from 'src/components/Treasure/TreasuresCell'
import SearchBar from 'src/components/SearchBar'
import FilterBar from 'src/components/FilterBar/FilterBar'
import { debounce } from 'src/utils/helpers'

import { filters } from './Filters'
import { anyValues, oneValue } from './Logic'

const TreasuresPage = () => {
  const [searchString, setSearchString] = useState('') // string search

  const [queryParameters, setQueryParameters] = useState({}) // for use in a 'makeQuery' function
  const params = useParams()

  const [filter, setFilter] = useState({}) // for use in a 'makeQuery' function
  const [sort, setSort] = useState('')

  const updateUrl = () => {
    console.log({
      ...(sort && { sort }),
      ...(Object.keys(filter) && filter),
      ...(queryParameters && { queryParameters }),
    })
    // TODO:  properly encode each item
    navigate(
      routes.treasures({
        ...(sort && { sort }),
        ...(Object.keys(filter) && filter),
        ...(queryParameters && { queryParameters }),
      }),
      { replace: true } // Prevent pushing to history stack
    )
  }

  const debounceUpdateUrl = debounce(updateUrl, 1000)

  useEffect(() => {
    // debounceUpdateUrl()
  }, [sort, filter, queryParameters])

  const updateSearchString = (value) => {
    // TODO: git
    setSearchValue(value)
  }

  // Populate search bar, filters, and sort from URL params on page load
  useEffect(() => {
    const { username } = params
    setSearchString(username)
  }, [])

  return (
    <>
      <MetaTags title="Treasures" />
      <h1 className="font-bold">Treasure Chess Marketplace</h1>
      <SearchBar
        initialQuery={searchString}
        setQuery={(d) => updateSearchString(d)}
      />
      <div className="flex">
        <FilterBar
          filterQuery={queryParameters}
          setFilterQuery={(d) => setQueryParameters(d)}
        />
        <TreasuresCell query={queryParameters} sort={sort} />
      </div>
    </>
  )
}

export default TreasuresPage
