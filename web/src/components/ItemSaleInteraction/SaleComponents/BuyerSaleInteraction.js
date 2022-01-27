import LoadingDots from '../../LoadingDots/LoadingDots'
import Button from '../../Button/Button'

const BuyerSaleInteraction = ({ marketSale, onClick, isError }) => {
  const { status, amount } = marketSale

  const DELISTED = 'DELISTED'
  const SOLD = 'SOLD'
  const PENDING_SOLD = 'PENDING_SOLD'

  if (status === DELISTED) return <></>

  const buttonText =
    status === SOLD
      ? 'View Treasure'
      : status === PENDING_SOLD
      ? 'Purchase in Progress'
      : 'Buy'

  const textColor = status === SOLD ? 'text-black' : 'text-white'
  const backgroundColor = status === SOLD ? 'bg-orange' : 'bg-chessBlack-200'

  const PurchaseButton = () => {
    return (
      <Button
        className={`w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-green hover:shadow-greenDark ${
          status === PENDING_SOLD && 'pointer-events-none'
        }`}
        label={buttonText}
        variant={status === PENDING_SOLD ? 'grey' : 'green'}
        onClick={onClick}
      />
    )
  }

  const Status = () => {
    if (isError) {
      return <p className="text-red">Purchase Failed. Please Try Again.</p>
    } else if (status === SOLD) {
      return <p className="text-black">Congrats! This is now your Treasure.</p>
    } else if (status === PENDING_SOLD) {
      return (
        <p className="text-white flex text-[10px]">
          Purchases can take up to 3 minutes.
          <div className="ml-2">
            <LoadingDots />
          </div>
        </p>
      )
    } else return null
  }

  return (
    <div
      className={`flex flex-col justify-between w-[396px] h-[108px] p-4 rounded-xl shadow-md ${backgroundColor}`}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-base ${textColor}`}>Buy Treasure</h2>
        {status && <Status />}
      </div>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl ml-3.5 ${textColor}`}>{`$${amount}`}</h2>
        <PurchaseButton />
      </div>
    </div>
  )
}

export default BuyerSaleInteraction
