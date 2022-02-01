import { useAuth } from '@redwoodjs/auth'

import { useMarket } from 'src/providers/market'

import { SaleSkeleton } from 'src/components/LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const UNLISTED = 'UNLISTED'

const TreasureSaleInteraction = ({ tokenId }) => {
  const { currentUser } = useAuth()
  const {
    // marketSale,
    marketStatus,
    marketError,
    marketLoading,
    isOwner,
    // buy,
    // list,
    // unlist,
    amount,
  } = useMarket()

  let isError = false

  if (marketLoading) return <SaleSkeleton />

  const onClick = () => {}

  if (isOwner) {
    return (
      <OwnerSaleInteraction
        status={marketStatus}
        amount={amount}
        onClick={onClick}
        isError={marketError}
      />
    )

    return (
      <BuyerSaleInteraction
        status={marketStatus}
        amount={amount}
        onClick={onClick}
        isError={marketError}
      />
    )
  }
}

export default TreasureSaleInteraction
