import { useEffect } from 'react'
import GameCard from 'src/components/Game/GameCard/GameCard'
import TreasureSocial from '../TreasureSocial/TreasureSocial'
import TreasureMoves from '../TreasureMoves/TreasureMoves'
import TreasureMarketInteraction from 'src/components/Treasure/TreasureMarketInteraction'
import { useMetaTags } from 'src/providers/metatags/metaTags'

const Treasure = ({ treasure, isLoading }) => {
  const { updateTags } = useMetaTags()

  useEffect(() => {
    treasure && updateTags(treasure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treasure])

  // const currentMarketSale = treasure.marketSales ? treasure.marketSales[0] : {}
  // <ItemSaleInteraction tokenId={tokenId} />
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
      <div className="flex justify-center">
        <GameCard game={treasure} isLoading={isLoading} />
      </div>
      <div>
        <TreasureMarketInteraction
          tokenId={treasure?.tokenId}
          isLoading={isLoading}
        />
        <TreasureSocial treasure={treasure} isLoading={isLoading} />
      </div>
      <TreasureMoves treasure={treasure} isLoading={isLoading} />
    </div>
  )
}

export default Treasure
