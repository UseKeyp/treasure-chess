import Table from 'src/components/Table/Table'

import MemberLink from 'src/components/MemberLink'
import { formatDate } from 'src/utils/helpers'

const TITLE = 'Activity'

const TreasureSales = ({ treasure, isLoading }) => {
  let list = []
  treasure?.marketSales.map((sale, i) => {
    const { status, amount, updatedAt, buyer } = sale
    if (status === 'SOLD') {
      list.push([
        formatDate(updatedAt),
        `$${amount}`,
        <MemberLink
          key={buyer.username + i}
          usernameOrAddress={buyer?.username}
        />,
      ])
    }
  })
  treasure && list.push([formatDate(treasure.createdAt), 'Minted'])
  return (
    <div>
      <Table title={TITLE} isLoading={isLoading} height={150} data={list} />
    </div>
  )
}

export default TreasureSales
