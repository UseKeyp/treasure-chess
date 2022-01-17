import Button from '../Button/Button'
import LoadingDots from '../LoadingDots/LoadingDots'

const ItemSaleInteraction = ({ isOwner, onClick, price, listStatus }) => {
  const SUCCESS = 'SUCCESS'
  const LOADING = 'LOADING'
  const ERROR = 'ERROR'

  const PurchaseButton = () => {
    const buttonText =
      listStatus && listStatus !== ERROR
        ? listStatus === SUCCESS
          ? 'View Treasure'
          : 'Purchase in Progress'
        : 'Buy'
    return (
      <Button
        className={`w-[272px] h-[40px] text-xl shadow-m hover:sm ${
          isOwner
            ? 'hover:bg-[#ffc82f] hover:shadow-orange'
            : 'hover:bg-green hover:shadow-greenDark'
        } ${listStatus === LOADING && 'pointer-events-none'}`}
        label={isOwner ? 'Unlist' : buttonText}
        variant={isOwner ? 'orange' : listStatus === LOADING ? 'grey' : 'green'}
        onClick={onClick}
      />
    )
  }

  const Status = () => {
    return listStatus === SUCCESS ? (
      <p className="text-black">Congrats! This is now your Treasure.</p>
    ) : listStatus === LOADING ? (
      <p className="text-white flex">
        Purchase in Progress
        <LoadingDots />
      </p>
    ) : (
      <p className="text-red text-[13px]">Purchase Failed. Please Try Again.</p>
    )
  }

  const textColor = listStatus === SUCCESS ? 'text-black' : 'text-white'
  const backgroundColor =
    listStatus === SUCCESS ? 'bg-orange' : 'bg-chessBlack-200'

  return (
    <div
      className={`flex flex-col justify-between w-[396px] h-[108px] p-4 rounded-xl shadow-md ${backgroundColor}`}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-base ${textColor}`}>Buy Treasure</h2>
        {listStatus && <Status />}
      </div>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl ml-3.5 ${textColor}`}>{`$${price}`}</h2>
        <PurchaseButton />
      </div>
    </div>
  )
}

export default ItemSaleInteraction
