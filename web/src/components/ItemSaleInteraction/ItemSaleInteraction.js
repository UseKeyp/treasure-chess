import { useAuth } from '@redwoodjs/auth'
import { SaleSkeleton } from '../LoadingSkeleton'
import BuyerSaleInteraction from './SaleComponents/BuyerSaleInteraction'
import OwnerSaleInteraction from './SaleComponents/OwnerSaleInteraction'

const ItemSaleInteraction = ({
  isError,
  isLoading,
  isOwner,
  onClick,
  marketSale,
}) => {
  const { currentUser } = useAuth()

  return isLoading || (!marketSale && isError) ? (
    <SaleSkeleton />
  ) : isOwner || marketSale.sellerId === currentUser?.id ? (
    <OwnerSaleInteraction
      marketSale={marketSale}
      onClick={onClick}
      isError={isError}
    />
  ) : (
    <BuyerSaleInteraction
      marketSale={marketSale}
      onClick={onClick}
      isError={isError}
    />
  )
}

export default ItemSaleInteraction
