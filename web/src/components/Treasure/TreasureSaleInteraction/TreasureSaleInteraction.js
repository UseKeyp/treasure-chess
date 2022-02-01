import { useAuth } from '@redwoodjs/auth'
import { SaleSkeleton } from 'src/components/LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const UNLISTED = 'UNLISTED'

const TreasureSaleInteraction = ({ marketSale, isLoading }) => {
  const { currentUser } = useAuth()

  const status = marketSale?.status || UNLISTED
  const amount = marketSale?.amount || 0
  const isOwner = currentUser?.id === marketSale?.treasure.owner.id
  let isError = false

  if (isLoading) return <SaleSkeleton />
  if (!marketSale) return <>empty</>

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
