import { MetaTags } from '@redwoodjs/web'
import { useParams, navigate, routes } from '@redwoodjs/router'

import SearchBar from 'src/components/SearchBar/SearchBar'
import TreasuresCell from 'src/components/Treasure/TreasuresCell'

// TOOD - replace with search values
const TEST_SEARCH_OPTIONS = ['abcd', 'abc', 'defg', 'def']

const TreasuresPage = () => {
  const [query, setQuery] = React.useState('')
  const [filter, setFilter] = React.useState({})
  const [sort, setSort] = React.useState('')

  const params = useParams()

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

  React.useEffect(() => {
    // TODO: Ensure this is the right way to debounce
    setTimeout(function () {
      updateUrl()
    }, 1000)
  }, [sort, filter, query])

  return (
    <>
      <MetaTags
        title="Treasure"
        // description="About the awesome team"
        // ogUrl="https://awesomeredwoodapp.com/start"
        // ogContentUrl="https://awesomeredwoodapp.com/static/og.png"
        // robots={['nofollow']}
      />
      <div className="marketplacePageContainer">
        <div className="marketplaceSearchBar">
          <SearchBar options={TEST_SEARCH_OPTIONS} setQuery={setQuery} />
        </div>
        <div className="marketplaceFeaturedHeader">Treasures</div>
        <TreasuresCell filter={filter} query={query} sort={sort} />
      </div>
    </>
  )
}

export default TreasuresPage
