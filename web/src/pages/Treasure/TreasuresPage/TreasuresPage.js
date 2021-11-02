import { MetaTags } from '@redwoodjs/web'

import SearchBar from 'src/components/SearchBar/SearchBar'

// TOOD - replace with search values
const TEST_SEARCH_OPTIONS = ['abcd', 'abc', 'defg', 'def']

const TreasuresPage = () => {
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
          <SearchBar options={TEST_SEARCH_OPTIONS} />
        </div>
        <div className="marketplaceFeaturedHeader">
          Featured NFT Collections
        </div>
      </div>
    </>
  )
}

export default TreasuresPage
