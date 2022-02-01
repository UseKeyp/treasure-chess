import TreasureMovesCell from 'src/components/Treasure/TreasureMovesCell'
import TreasureSocialCell from 'src/components/Treasure/TreasureSocialCell'
import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import TreasureSaleInteractionCell from 'src/components/Treasure/TreasureSaleInteractionCell'

const Treasure = ({ tokenId }) => {
  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}

  // <ItemSaleInteraction tokenId={tokenId} />
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
      <div className="flex justify-center">
        <TreasureCardCell tokenId={tokenId} />
      </div>
      <div>
        <TreasureSaleInteractionCell tokenId={tokenId} />
        <TreasureSocialCell tokenId={tokenId} />
      </div>
      <TreasureMovesCell tokenId={tokenId} />
    </div>
  )
}

export default Treasure
