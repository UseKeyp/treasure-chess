import { useMarket } from 'src/providers/market'

import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'

const DELISTED = 'DELISTED'
const SOLD = 'SOLD'
const PENDING_SOLD = 'PENDING_SOLD'

const BuyerSaleInteraction = () => {
  const { marketStatus, marketError, buy, amount } = useMarket()

  if (marketStatus === null) return <></>

  const buttonText =
    marketStatus === SOLD
      ? 'View Treasure'
      : marketStatus === PENDING_SOLD
      ? 'Purchase in Progress'
      : 'Buy'

  const textColor = marketStatus === SOLD ? 'text-black' : 'text-white'
  const backgroundColor =
    marketStatus === SOLD ? 'bg-orange' : 'bg-chessBlack-200'

  const PurchaseButton = () => {
    return (
      <Button
        className={`w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-green hover:shadow-greenDark ${
          marketStatus === PENDING_SOLD && 'pointer-events-none'
        }`}
        label={buttonText}
        variant={marketStatus === PENDING_SOLD ? 'grey' : 'green'}
        onClick={buy}
      />
    )
  }

  const Status = () => {
    if (marketError) {
      return <p className="text-red">Purchase Failed. Please Try Again.</p>
    } else if (marketStatus === SOLD) {
      return <p className="text-black">Congrats! This is now your Treasure.</p>
    } else if (marketStatus === PENDING_SOLD) {
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
      className={`flex flex-col justify-between w-[396px] h-[108px] mb-4 p-4 rounded-xl shadow-md ${backgroundColor}`}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-base ${textColor}`}>Buy Treasure</h2>
        {marketStatus && <Status />}
      </div>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl ml-3.5 ${textColor}`}>{`$${amount}`}</h2>
        <PurchaseButton />
      </div>
    </div>
  )
}

export default BuyerSaleInteraction
