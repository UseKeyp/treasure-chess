import TreasureMovesCell from 'src/components/Treasure/TreasureMovesCell'
import TreasureSocialCell from 'src/components/Treasure/TreasureSocialCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import ItemSaleInteraction from 'src/components/ItemSaleInteraction/ItemSaleInteraction'

const Treasure = ({ treasure, isLoading, isEmpty, isError }) => {
  // TODO: Update these with proper UI
  // We could pass isLoading to the individual items so they can render the appropriate skeletons
  // This way everything stays "in place"
  if (isLoading) return <>Loading...</>
  if (isError) return <>Error</>

  const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
      <div className="flex justify-center">
        <TreasureCardCell tokenId={treasure.tokenId} />
      </div>
      <div>
        <ItemSaleInteraction marketSale={currentMarketSale} />
        <TreasureSocialCell tokenId={treasure.tokenId} />
      </div>
      <TreasureMovesCell tokenId={treasure.tokenId} />
    </div>
  )
}

export default Treasure
