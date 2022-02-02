import { useAuth } from '@redwoodjs/auth'

import { useMarket } from 'src/providers/market'

import { SaleSkeleton } from 'src/components/LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const UNLISTED = 'UNLISTED'

const TreasureMarketInteraction = ({ tokenId }) => {
  const { currentUser } = useAuth()
  const { marketLoading, isOwner } = useMarket()
  if (marketLoading) return <SaleSkeleton />
  if (isOwner) return <OwnerSaleInteraction />
  return <BuyerSaleInteraction />
}

export default TreasureMarketInteraction
