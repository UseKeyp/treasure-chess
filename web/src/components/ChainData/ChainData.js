import Icon from 'src/components/Icon'
import config from 'src/global.config'
import { RowsSkeleton } from 'src/components/LoadingSkeleton'
const getAddressContent = (address) => (
  <div className="flex">
    <p className="ml-2 mr-2">{address}</p>
    <a
      href={`${config.BLOCK_EXPLORER_BASE_URL}address/${address}`}
      target="blank"
    >
      <Icon name="network" color="white" />
    </a>
  </div>
)

const ChainData = ({ chainData, isLoading, isError }) => {
  if (isLoading)
    return (
      <>
        <RowsSkeleton />
        <RowsSkeleton />
        <RowsSkeleton />
        <RowsSkeleton />
      </>
    )
  if (isError) return <p>Error fetching chain data</p>
  const { networkName, treasureAddress, marketAddress, totalSupply } = chainData
  return (
    <div>
      <p className="mt-4">Network: {networkName}</p>
      <div className="flex mt-4">
        <p>Treasure contract address:</p> {getAddressContent(treasureAddress)}
      </div>
      <div className="flex mt-4">
        <p>Market contract address:</p> {getAddressContent(marketAddress)}
      </div>
      <p className="flex mt-4">Total supply: {totalSupply}</p>
    </div>
  )
}

export default ChainData
