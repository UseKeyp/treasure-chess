import TreasureMovesCell from 'src/components/Treasure/TreasureMovesCell'
import TreasureSocialCell from 'src/components/Treasure/TreasureSocialCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import ItemSaleInteraction from 'src/components/ItemSaleInteraction/ItemSaleInteraction'

const Treasure = ({ tokenId }) => {
  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
      <div className="flex justify-center">
        <TreasureCardCell tokenId={tokenId} />
      </div>
      <div>
        <ItemSaleInteraction tokenId={tokenId} />
        <TreasureSocialCell tokenId={tokenId} />
      </div>
      <TreasureMovesCell tokenId={tokenId} />
    </div>
  )
}

export default Treasure
