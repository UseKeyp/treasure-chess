import { useMarket } from 'src/providers/market'

import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'

import { PENDING_SOLD, SOLD } from 'src/providers/market/constants'

const BuyerSaleInteraction = () => {
  const { actionStatus, actionError, marketStatus, buy, amount } = useMarket()

  if (marketStatus === null) return <></>

  let buttonText = 'Buy'
  if (actionStatus === PENDING_SOLD) buttonText = 'Purchase in Progress'

  const textColor = marketStatus === PENDING_SOLD ? 'text-black' : 'text-white'
  const backgroundColor =
    marketStatus === SOLD ? 'bg-orange' : 'bg-chessBlack-200'

  const PurchaseButton = () => {
    return (
      <Button
        className={`w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-green hover:shadow-greenDark ${
          actionStatus === PENDING_SOLD && 'pointer-events-none'
        }`}
        label={buttonText}
        variant={actionStatus === PENDING_SOLD ? 'grey' : 'green'}
        onClick={buy}
      />
    )
  }

  const Status = () => {
    if (actionError) {
      return <p className="text-red">{actionError}</p>
    } else if (actionStatus === SOLD) {
      return <p className="text-black">Congrats! This is now your Treasure.</p>
    } else if (actionStatus === PENDING_SOLD) {
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
