import GameCard from 'src/components/Game/GameCard/GameCard'
import TreasureSocial from '../TreasureSocial/TreasureSocial'
import TreasureMoves from '../TreasureMoves/TreasureMoves'
import TreasureMarketInteraction from 'src/components/Treasure/TreasureMarketInteraction'
import TreasureSales from '../TreasureSales/TreasureSales'
import TreasuresFetcher from 'src/components/Treasure/TreasuresFetcher'

const Treasure = ({ treasure, isLoading }) => {
  const players = [treasure?.white.username, treasure?.black.username]
  const getUsernames = (players) => Object.values(players).toString()
  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}
  // <ItemSaleInteraction tokenId={tokenId} />
  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        <div className="flex justify-center">
          <GameCard game={treasure} isLoading={isLoading} showGif />
        </div>
        <div className="flex flex-col gap-4">
          <TreasureMarketInteraction
            tokenId={treasure?.tokenId}
            isLoading={isLoading}
          />
          <TreasureSales treasure={treasure} isLoading={isLoading} />
          <TreasureSocial treasure={treasure} isLoading={isLoading} />
        </div>
        <TreasureMoves treasure={treasure} isLoading={isLoading} />
      </div>
      <h1 className="mt-16">More by these users</h1>
      <div className="w-full mt-4">
        <TreasuresFetcher
          username={getUsernames(players)}
          sort="Price: Low to High"
        />
      </div>
    </div>
  )
}

export default Treasure
