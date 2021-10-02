import SearchBar from 'src/components/SearchBar/SearchBar'

// TOOD - replace with search values
const TEST_SEARCH_OPTIONS = ['abcd', 'abc', 'defg', 'def']

const MarketplacePage = () => {
  return (
    <div className="marketplacePageContainer">
      <div className="marketplaceSearchBar">
        <SearchBar options={TEST_SEARCH_OPTIONS} />
      </div>
      <div className="marketplaceFeaturedHeader">Featured NFT Collections</div>
    </div>
  )
}

export default MarketplacePage
