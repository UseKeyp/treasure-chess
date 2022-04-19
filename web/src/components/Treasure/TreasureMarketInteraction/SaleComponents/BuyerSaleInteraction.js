import { useMarket } from 'src/providers/market'

import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'

import { PENDING_SOLD, SOLD, DELISTED } from 'src/providers/market/constants'

const BuyerSaleInteraction = () => {
  const { actionStatus, actionError, marketStatus, buy } = useMarket()
  if ([null, DELISTED, SOLD].includes(marketStatus) && actionStatus !== SOLD)
    return <></>
  let buttonText = 'Buy'
  if (actionStatus === PENDING_SOLD)
    buttonText = (
      <div className="flex items-center justify-center">
        <div className="mr-2">
          <LoadingDots />
        </div>
        Buying
      </div>
    )

  const textColor = marketStatus === PENDING_SOLD ? 'text-black' : 'text-white'

  const PurchaseButton = () => {
    if (actionStatus === SOLD) return <div className="w-[272px] h-[40px]"></div>
    return (
      <Button
        className={`w-[200px] h-[40px] text-xl shadow-m hover:sm hover:bg-green hover:shadow-greenDark ${
          [PENDING_SOLD, SOLD].includes(actionStatus) && 'pointer-events-none'
        }`}
        label={buttonText}
        variant={actionStatus === PENDING_SOLD ? 'grey' : 'green'}
        onClick={buy}
      />
    )
  }

  const Status = () => {
    if (actionError) {
      return <p className="text-red font-bold">{actionError}</p>
    } else if (actionStatus === SOLD) {
      return <p className="mt-4">🎉 Congrats! This is now your Treasure.</p>
    } else return null
  }

  return (
    <div
      className={`flex flex-col justify-between mb-4 p-4 rounded-xl shadow-md bg-chessBlack-200`}
    >
      <div className="flex flex-col">
        <h2 className={`text-base ${textColor}`}>Buy Treasure</h2>
        {marketStatus && <Status />}
      </div>
      <div className="flex items-center justify-center mt-2">
        <PurchaseButton />
      </div>
    </div>
  )
}

export default BuyerSaleInteraction
