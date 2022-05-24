import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'

import FilterPriceInput from 'src/components/FilterPriceInput'
// import UsernameSearchBar from 'src/components/UsernameSearchBar/UsernameSearchBar'
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
    // gift
  } = useMarket()
  const [listAmount, setListAmount] = React.useState()
  // const [username, setUsername] = React.useState(0)
  let statusContent = null

  if (actionError) {
    statusContent = (
      <p className="text-errorYellow font-bold text-[11px]">{actionError}</p>
    )
  }

  if ([PENDING_LISTED, null, DELISTED, SOLD].includes(marketStatus))
    return (
      <div className="flex flex-col p-4 space-y-4 rounded-xl shadow-md justify-between bg-chessBlack-200">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base text-white">List Your Treasure</h2>
            {statusContent}
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="min-w-0 w-full">
              <FilterPriceInput value={listAmount} setValue={setListAmount} />
            </div>
            <Button
              className={`w-28 h-[40px] text-xl ml-2 hover:bg-green hover:shadow-greenDark ${
                actionStatus === PENDING_LISTED && 'pointer-events-none'
              }`}
              variant={actionStatus === PENDING_LISTED ? 'grey' : 'green'}
              label={
                actionStatus === PENDING_LISTED ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2">
                      <LoadingDots />
                    </div>
                    Listing
                  </div>
                ) : (
                  'List'
                )
              }
              onClick={() => list(listAmount)}
            />
          </div>
        </div>
        {/*<div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base text-white">Gift this Treasure</h2>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="min-w-0 w-full">
              <UsernameSearchBar value={username} setValue={setUsername} />
            </div>
            <Button
              className={`w-28 h-[40px] text-xl ml-2 hover:bg-green hover:shadow-greenDark ${
                actionStatus === PENDING_LISTED && 'pointer-events-none'
              }`}
              variant={actionStatus === PENDING_LISTED ? 'grey' : 'green'}
              label="Gift"
              onClick={() => gift(username)}
            />
          </div>
        </div>*/}
      </div>
    )
  return (
    <div>
      <div className="flex flex-col justify-between h-[108px] p-4 mb-4 rounded-xl shadow-md bg-chessBlack-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-white">Listed</h2>
          {statusContent}
        </div>
        <div className="flex items-center justify-center">
          <Button
            className={`w-[200px] h-[40px] text-xl shadow-m hover:sm hover:bg-[#ffc82f] hover:shadow-errorYellow' ${
              actionStatus === PENDING_DELISTED && 'pointer-events-none'
            }`}
            label={
              actionStatus === PENDING_DELISTED ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2">
                    <LoadingDots />
                  </div>
                  Unlisting
                </div>
              ) : (
                'Unlist'
              )
            }
            variant={actionStatus === PENDING_DELISTED ? 'grey' : 'errorYellow'}
            onClick={unlist}
          />
        </div>
      </div>
    </div>
  )
}

export default OwnerSaleInteraction
