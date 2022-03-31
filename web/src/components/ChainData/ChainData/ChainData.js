import Icon from 'src/components/Icon'
import config from 'src/global.config'
import Table from 'src/components/Table'

const TITLE = 'Chain Data'
const HEIGHT = 300
const WIDTH = 500

const ChainData = ({ chainData, isLoading, isError }) => {
  if (isLoading)
    return <Table title={TITLE} isLoading height={HEIGHT} width={WIDTH} />
  else if (isError)
    return (
      <Table
        title={TITLE}
        error="Error fetching chain data"
        height={HEIGHT}
        width={WIDTH}
      />
    )
  else {
    const {
      networkName,
      treasureAddress,
      marketAddress,
      totalSupply,
      environment,
      nodeEnvironment,
    } = chainData
    const rows = [
      ['Network', networkName],
      [
        'Treasure',
        treasureAddress,
        {
          text: <Icon name="network" color="white" />,
          href: `${config.BLOCK_EXPLORER_BASE_URL}address/${treasureAddress}`,
        },
      ],
      [
        'Market',
        marketAddress,
        {
          text: <Icon name="network" color="white" />,
          href: `${config.BLOCK_EXPLORER_BASE_URL}address/${marketAddress}`,
        },
      ],
      ['Total supply', totalSupply],
    ]
    return (
      <>
        <Table title={TITLE} data={rows} height={HEIGHT} width={WIDTH} />
        <p className="mt-4 text-greyLight">
          Environment: api {environment}, web {process.env.ENVIRONMENT}
        </p>
        <p className="text-greyLight">
          Node environment: api {nodeEnvironment}, web {process.env.NODE_ENV}
        </p>
      </>
    )
  }
}
export default ChainData
