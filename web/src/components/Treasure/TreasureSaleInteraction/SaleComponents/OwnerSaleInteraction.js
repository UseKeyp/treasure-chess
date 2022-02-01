import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'
import SearchBar from 'src/components/Marketplace/SearchBar/SearchBar'
import UsernameSearchBar from 'src/components/UsernameSearchBar/UsernameSearchBar'

const OwnerSaleInteraction = ({ status, amount, onClick, isError }) => {
  const PENDING_LISTED = 'PENDING_LISTED'
  const PENDING_DELISTED = 'PENDING_DELISTED'

  const Status = () => {
    if (isError) {
      return (
        <p className="text-red text-[11px]">
          An error occurred, please try again.
        </p>
      )
    } else if (status === PENDING_LISTED) {
      return (
        <p className="text-white flex text-[10px]">
          Listing can take up to 3 minutes.
          <div className="ml-2">
            <LoadingDots />
          </div>
        </p>
      )
    } else if (status === PENDING_DELISTED) {
      return (
        <p className="text-white flex text-[10px]">
          Delisting can take up to 3 minutes.
          <div className="ml-2">
            <LoadingDots />
          </div>
        </p>
      )
    } else return null
  }

  return amount !== 0 ? (
    <div>
      <div className="flex flex-col justify-between w-[396px] h-[108px] p-4 mb-4 rounded-xl shadow-md bg-chessBlack-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-white">Buy Treasure</h2>
          {status && <Status />}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl ml-3.5 text-white">{`$${amount}`}</h2>
          <Button
            className={`w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-[#ffc82f] hover:shadow-orange' ${
              status === PENDING_DELISTED && 'pointer-events-none'
            }`}
            label={
              status === PENDING_DELISTED ? 'Delisting in progress.' : 'Unlist'
            }
            variant={status === PENDING_DELISTED ? 'grey' : 'orange'}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-[396px] h-52 p-4 mb-4 rounded-xl shadow-md justify-between bg-chessBlack-200">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base text-white">List Your Treasure</h2>
          {status && <Status />}
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
            <SearchBar placeholder="Price in USD" />
            <Button
              className={`w-28 h-[40px] text-xl ml-2 hover:bg-green hover:shadow-greenDark ${
                status === PENDING_LISTED && 'pointer-events-none'
              }`}
              variant={status === PENDING_LISTED ? 'grey' : 'green'}
              label="List"
              onClick={() => onClick('list')}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base text-white">Gift this Treasure</h2>
          <p className="text-[10px]">
            Enter the person you want to gift it to.
          </p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
            <UsernameSearchBar />
            <Button
              className={`w-28 h-[40px] text-xl ml-2 hover:bg-green hover:shadow-greenDark ${
                status === PENDING_LISTED && 'pointer-events-none'
              }`}
              variant={status === PENDING_LISTED ? 'grey' : 'green'}
              label="Gift"
              onClick={() => onClick('gift')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerSaleInteraction
