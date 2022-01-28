import { useAuth } from '@redwoodjs/auth'
import { SaleSkeleton } from '../LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const UNLISTED = 'UNLISTED'

const ItemSaleInteraction = ({
  isError,
  isLoading,
  isOwner,
  onClick,
  marketSale,
}) => {
  const { currentUser } = useAuth()
  const status = marketSale?.status || UNLISTED
  const amount = marketSale?.amount || 0
  if (isLoading || (!marketSale && isError)) {
    return <SaleSkeleton />
  } else {
    if (isOwner || marketSale?.sellerId === currentUser?.id) {
      return (
        <OwnerSaleInteraction
          status={status}
          amount={amount}
          onClick={onClick}
          isError={isError}
        />
      )
    } else {
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
}

export default ItemSaleInteraction
