import Table from 'src/components/Table/Table'

import MemberLink from 'src/components/MemberLink'
import { formatDate } from 'src/utils/helpers'
import { useMarket } from 'src/providers/market'
import LoadingDots from 'src/components/LoadingDots'

const TITLE = 'Activity'

const TreasureActivity = ({ treasure, isLoading }) => {
  const { marketStatus, amount: listAmount } = useMarket
  let list = []
  treasure?.marketSales.map((sale, i) => {
    const { status, amount, updatedAt, buyer } = sale
    if (status === 'SOLD') {
      list.push([
        formatDate(updatedAt),
        `$${amount}`,
        <MemberLink key={buyer.username + i} member={buyer} />,
      ])
    }
  })

  treasure && list.push([formatDate(treasure.createdAt), 'Minted'])

  if (marketStatus)
    list.unshift([
      'Now',
      `$${listAmount}`,
      <div
        key={marketStatus}
        className="flex space-x-2 font-bold align-center items-center w-32"
      >
        <LoadingDots />
        <div>{marketStatus}</div>
      </div>,
    ])

  return (
    <div>
      <Table title={TITLE} isLoading={isLoading} height={150} data={list} />
    </div>
  )
}

export default TreasureActivity
