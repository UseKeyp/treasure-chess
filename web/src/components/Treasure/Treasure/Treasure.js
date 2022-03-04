import GameCard from 'src/components/Game/GameCard/GameCard'
import TreasureSocial from '../TreasureSocial/TreasureSocial'
import TreasureMoves from '../TreasureMoves/TreasureMoves'
import TreasureMarketInteraction from 'src/components/Treasure/TreasureMarketInteraction'
import TreasureSale from '../TreasureSale/TreasureSale'

const Treasure = ({ treasure, isLoading }) => {
  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}
  // <ItemSaleInteraction tokenId={tokenId} />
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
      <div className="flex justify-center">
        <GameCard game={treasure} isLoading={isLoading} />
      </div>
      <div className="flex flex-col gap-4">
        <TreasureMarketInteraction
          tokenId={treasure?.tokenId}
          isLoading={isLoading}
        />
        <TreasureSale treasure={treasure} isLoading={isLoading} />
        <TreasureSocial treasure={treasure} isLoading={isLoading} />
      </div>
      <TreasureMoves treasure={treasure} isLoading={isLoading} />
    </div>
  )
}

export default Treasure
