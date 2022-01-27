import { useAuth } from '@redwoodjs/auth'
import { SaleSkeleton } from '../LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const ItemSaleInteraction = ({
  isError,
  isLoading,
  isOwner,
  onClick,
  marketSales,
}) => {
  const { currentUser } = useAuth()

  return isLoading || (!marketSales && isError) ? (
    <SaleSkeleton />
  ) : isOwner || marketSales.sellerId === currentUser.id ? (
    <OwnerSaleInteraction
      marketSales={marketSales}
      onClick={onClick}
      isError={isError}
    />
  ) : (
    <BuyerSaleInteraction
      marketSales={marketSales}
      onClick={onClick}
      isError={isError}
    />
  )
}

export default ItemSaleInteraction
