import Icon from 'src/components/Icon'
import config from 'src/global.config'
import { RowsSkeleton } from 'src/components/LoadingSkeleton'
const getAddressContent = (address) => (
  <div className="flex">
    {address}
    <a
      href={`${config.BLOCK_EXPLORER_BASE_URL}address/${address}`}
      target="blank"
    >
      <Icon name="network" color="grey" />
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
      <p>Treasure contract address: {getAddressContent(treasureAddress)}</p>
      <p>Market contract address: {getAddressContent(marketAddress)}</p>
      <p>Total supply: {totalSupply}</p>
    </div>
  )
}

export default ChainData
