import { useState, useEffect } from 'react'
import { useParams, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TreasuresCell from 'src/components/Treasure/TreasuresCell'
import SearchBar from 'src/components/Marketplace/SearchBar/SearchBar'
import FilterBar from 'src/components/FilterBar/FilterBar'

import { filters } from './Filters'
import { anyValues, oneValue } from './Logic'

const TreasuresPage = () => {
  const [searchValue, setSearchValue] = useState('') // string search
  const [queryParameters, setQueryParameters] = useState({}) // for use in a 'makeQuery' function
  const params = useParams()

  const [sort, setSort] = useState('')

  const updateUrl = () => {
    console.log({
      ...(sort && { sort }),
      ...(Object.keys(filter) && filter),
      ...(query && { query }),
    })
    navigate(
      routes.treasures({
        ...(sort && { sort }),
        ...(Object.keys(filter) && filter),
        ...(query && { query }),
      }),
      { replace: true } // Prevent pushing to history stack
    )
  }

  useEffect(() => {
    // TODO: Ensure this is the right way to debounce
    setTimeout(function () {
      updateUrl()
    }, 1000)
  }, [sort, filter, query])

  const updateSearchString = (value) => {
    setSearchValue(value)
  }

  return (
    <>
      <MetaTags
        title="Treasure"
        // description="About the awesome team"
        // ogUrl="https://awesomeredwoodapp.com/start"
        // ogContentUrl="https://awesomeredwoodapp.com/static/og.png"
        // robots={['nofollow']}
      />
      <h1 className="font-bold">Treasure Chess Marketplace</h1>
      <SearchBar
        value={searchValue}
        changeHandler={(d) => updateSearchString(d)}
      />
      <FilterBar
        filterQuery={queryParameters}
        setFilterQuery={(d) => setQueryParameters(d)}
      />
      <TreasuresCell query={queryParameters} sort={sort} />
    </>
  )
}

export default TreasuresPage
