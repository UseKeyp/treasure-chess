import { useAuth } from '@redwoodjs/auth'

import { useMarket } from 'src/providers/market'

import { SaleSkeleton } from 'src/components/LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const UNLISTED = 'UNLISTED'

const TreasureSaleInteraction = ({ tokenId }) => {
  const { currentUser } = useAuth()
  const { treasure, marketSale, isLoading, buy, sell, list, unlist } =
    useMarket({ tokenId })

  const status = treasure?.marketSales[0]?.status || UNLISTED
  const amount = treasure?.marketSales[0]?.amount || 0
  const isOwner = currentUser?.id === treasure?.ownerId
  let isError = false

  if (isLoading) return <SaleSkeleton />

  const onClick = () => {}

  if (isOwner) {
    return (
      <OwnerSaleInteraction
        status={status}
        amount={amount}
        onClick={onClick}
        isError={isError}
      />
    )

    return (
      <BuyerSaleInteraction
        status={status}
        amount={amount}
        onClick={onClick}
        isError={isError}
      />
    )
  }
}

export default TreasureSaleInteraction
