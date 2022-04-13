import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'

import FilterPriceInput from 'src/components/FilterPriceInput'
import UsernameSearchBar from 'src/components/UsernameSearchBar/UsernameSearchBar'
import { useMarket } from 'src/providers/market'

import {
  PENDING_LISTED,
  PENDING_DELISTED,
  DELISTED,
  SOLD,
} from 'src/providers/market/constants'

const OwnerSaleInteraction = () => {
  const {
    actionStatus,
    actionError,
    marketStatus,
    list,
    unlist,
    gift,
    amount,
  } = useMarket()
  const [listAmount, setListAmount] = React.useState()
  const [username, setUsername] = React.useState(0)
  let statusContent = null

  if (actionError) {
    statusContent = (
      <p className="text-red  font-bold text-[11px]">{actionError}</p>
    )
  } else if (actionStatus === PENDING_LISTED) {
    statusContent = (
      <div className=" flex">
        <p className="text-white text-[10px]">
          Listing can take up to 3 minutes.
        </p>
        <div className="ml-2">
          <LoadingDots />
        </div>
      </div>
    )
  } else if (actionStatus === PENDING_DELISTED) {
    statusContent = (
      <div className=" flex">
        <p className="text-white text-[10px]">
          Delisting can take up to 3 minutes.
        </p>
        <div className="ml-2">
          <LoadingDots />
        </div>
      </div>
    )
  }

  if ([PENDING_LISTED, null, DELISTED, SOLD].includes(marketStatus))
    return (
      <div className="flex flex-col h-52 p-4 rounded-xl shadow-md justify-between bg-chessBlack-200">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base text-white">List Your Treasure</h2>
            {statusContent}
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="flex items-center justify-end w-full">
              <FilterPriceInput value={listAmount} setValue={setListAmount} />
              <Button
                className={`w-28 h-[40px] text-xl ml-2 hover:bg-green hover:shadow-greenDark ${
                  actionStatus === PENDING_LISTED && 'pointer-events-none'
                }`}
                variant={actionStatus === PENDING_LISTED ? 'grey' : 'green'}
                label="List"
                onClick={() => list(listAmount)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base text-white">Gift this Treasure</h2>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="flex items-center justify-end w-full">
              <UsernameSearchBar value={username} setValue={setUsername} />
              <Button
                className={`w-28 h-[40px] text-xl ml-2 hover:bg-green hover:shadow-greenDark ${
                  actionStatus === PENDING_LISTED && 'pointer-events-none'
                }`}
                variant={actionStatus === PENDING_LISTED ? 'grey' : 'green'}
                label="Gift"
                onClick={() => gift(username)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  return (
    <div>
      <div className="flex flex-col justify-between h-[108px] p-4 mb-4 rounded-xl shadow-md bg-chessBlack-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-white">Listed</h2>
          {statusContent}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl ml-3.5 text-white">{`$${amount}`}</h2>
          <Button
            className={`w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-[#ffc82f] hover:shadow-orange' ${
              actionStatus === PENDING_DELISTED && 'pointer-events-none'
            }`}
            label={
              actionStatus === PENDING_DELISTED
                ? 'Delisting in progress.'
                : 'Unlist'
            }
            variant={actionStatus === PENDING_DELISTED ? 'grey' : 'orange'}
            onClick={unlist}
          />
        </div>
      </div>
    </div>
  )
}

export default OwnerSaleInteraction
