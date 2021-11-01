import { useState, useEffect } from 'react'
import { useParams, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TreasuresCell from 'src/components/Treasure/TreasuresCell'
import SearchBar from 'src/components/SearchBar'
import FilterBar from 'src/components/FilterBar/FilterBar'
import { debounce } from 'src/utils/helpers'

import { anyValues, oneValue } from './Logic'

const TreasuresPage = () => {
  const params = useParams()

  // TODO: set other intiial values too
  const {
    username: initialUsername = '',
    sort: initialSort = '',
    ...initialFilter
  } = params

  // These are the source of truth
  const [username, setUsername] = useState(initialUsername)
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState(initialSort)

  const convertToParams = (obj) => {
    let params = {}
    return params
  }

  console.log(filter)
  const updateUrl = () => {
    // const filterParams = convertToParams(filter)
    const searchParams = new URLSearchParams(filter)
    username && searchParams.append('username', username)
    sort && searchParams.append('sort', sort)
    // Object.keys(filter).map((key) => {
    //   console.log(filter[key])
    //   if (filter[key] && filter[key] !== [])
    //     searchParams.append(key, encodeURI(filter[key]))
    // })
    console.log({ ...searchParams })
    // window.location.search = searchParams
    // navigate(
    //   routes.treasures({
    //     ...(sort && { sort }),
    //     ...(Object.keys(filter) && { ...filterObject }),
    //     ...(username && { username }),
    //   }),
    //   { replace: true } // Prevent pushing to history stack
    // )
  }
  const update = () => {
    updateUrl()
  }

  const debounceUpdate = debounce(update, 4000)

  useEffect(() => {
    debounceUpdate()
  }, [sort, filter, username])

  return (
    <>
      <MetaTags title="Treasures" />
      <h1 className="font-bold">Treasure Chess Marketplace</h1>
      <SearchBar initialQuery={username} setQuery={setUsername} />
      <div className="flex">
        <FilterBar intialFilter={filter} setFilter={setFilter} />
        <TreasuresCell username={username} filter={filter} sort={sort} />
      </div>
    </>
  )
}

export default TreasuresPage
