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
  return isLoading || (!marketSale && isError) ? (
    <SaleSkeleton />
  ) : isOwner || marketSale?.sellerId === currentUser?.id ? (
    <OwnerSaleInteraction
      status={status}
      amount={amount}
      onClick={onClick}
      isError={isError}
    />
  ) : (
    <BuyerSaleInteraction
      status={status}
      amount={amount}
      onClick={onClick}
      isError={isError}
    />
  )
}

export default ItemSaleInteraction
