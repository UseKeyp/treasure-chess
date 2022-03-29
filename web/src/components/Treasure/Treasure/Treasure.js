import GameCard from 'src/components/Game/GameCard/GameCard'
import TreasureSocial from '../TreasureSocial/TreasureSocial'
import TreasureMoves from '../TreasureMoves/TreasureMoves'
import TreasureMarketInteraction from 'src/components/Treasure/TreasureMarketInteraction'
import TreasureSale from '../TreasureSale/TreasureSale'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const Treasure = ({ treasure, isLoading }) => {
  const players = [treasure.white.username, treasure.black.username]
  const getUsernames = (players) => Object.values(players).toString()
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
      <h1 className="mt-8">More by these users</h1>
      <div className="flex mt-4">
        <TreasuresFetcher
          username={getUsernames(players)}
          sort="Price: Low to High"
        />
      </div>
    </div>
  )
}

export default Treasure
