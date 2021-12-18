import { useState, useEffect } from 'react'
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import TreasuresCell from 'src/components/Treasure/TreasuresCell'
import FilterBar from 'src/components/FilterBar/FilterBar'
import { TreasuresContext } from 'src/providers/context'

const TreasuresPage = () => {
  const params = useParams()
  const [treasuresContext] = React.useContext(TreasuresContext)
  const { page } = treasuresContext

  const {
    username: initialUsername = '',
    sort: initialSort = '',
    ...initialFilter
  } = params

  // These are the source of truth
  const username = initialUsername
  const [filter, setFilter] = useState(initialFilter)
  const [sort, _setSort] = useState(initialSort) // TODO: Add sorting

  const updateUrl = () => {
    const searchParams = new URLSearchParams(filter)
    username && searchParams.append('username', username)
    sort && searchParams.append('sort', sort)
    searchParams.sort()
    const newPath = searchParams.toString()
      ? window.location.pathname + '?' + searchParams.toString()
      : window.location.pathname
    window.history.replaceState({}, '', newPath)
  }

  useEffect(() => {
    updateUrl()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [sort, filter, username])

  return (
    <div>
      <MetaTags title="Treasures" />

      <div className="flex">
        <FilterBar filter={filter} setFilter={setFilter} />
        <TreasuresCell
          username={username}
          filter={new URLSearchParams(filter).toString()}
          sort={sort}
          page={page}
        />
      </div>
    </div>
  )
}

export default TreasuresPage
