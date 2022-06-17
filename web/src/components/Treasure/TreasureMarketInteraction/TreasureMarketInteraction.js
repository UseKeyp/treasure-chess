import { SaleSkeleton } from 'src/components/LoadingSkeleton'
import { useMarket } from 'src/providers/market'

import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const TreasureMarketInteraction = () => {
  const { marketLoading, isOwner } = useMarket()
  if (marketLoading) return <SaleSkeleton />
  if (isOwner) return <OwnerSaleInteraction />
  return <BuyerSaleInteraction />
}

export default TreasureMarketInteraction
