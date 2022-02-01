import TreasureMovesCell from 'src/components/Treasure/TreasureMovesCell'
import TreasureSocialCell from 'src/components/Treasure/TreasureSocialCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import TreasureSaleInteraction from 'src/components/Treasure/TreasureSaleInteraction'

const Treasure = ({ tokenId }) => {
  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}

  // <ItemSaleInteraction tokenId={tokenId} />
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
      <div className="flex justify-center">
        <TreasureCardCell tokenId={tokenId} />
      </div>
      <div>
        <TreasureSaleInteraction tokenId={tokenId} />
        <TreasureSocialCell tokenId={tokenId} />
      </div>
      <TreasureMovesCell tokenId={tokenId} />
    </div>
  )
}

export default Treasure
