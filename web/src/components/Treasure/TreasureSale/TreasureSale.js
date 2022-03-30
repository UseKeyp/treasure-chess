import Table from 'src/components/Table/Table'

const TITLE = 'Sales'
import MemberLink from 'src/components/MemberLink'
import { formatDate } from 'src/utils/helpers'

const statusToText = {
  PENDING_LISTED: 'Listing...',
  LISTED: 'Listed',
  PENDING_SOLD: 'Listed',
  SOLD: 'Sold',
  PENDING_DELISTED: 'Unlisting...',
  DELISTED: 'Unlisted',
}

const TreasureSale = ({ treasure, isLoading }) => {
  let list = []
  treasure?.marketSales.map((sale) => {
    const { status, amount } = sale
    if (status === 'SOLD') {
      list.push([
        formatDate(sale.updatedAt),
        `$${sale.amount}`,
        <MemberLink usernameOrAddress={sale?.buyer?.username} />,
      ])
    }
    //
    // if (sale.unlistTx)
    //   list.push(['Unlisted', sale.unlistTx.updatedAt, `$${sale.amount}`])
    //
    // if (sale.listTx)
    //   list.push(['Listed', sale.listTx.updatedAt, `$${sale.amount}`])
  })
  // treasure &&
  //   list.push([
  //     'Minted',
  //     treasure.createdAt,
  //     <>
  //       by <MemberLink usernameOrAddress={treasure.minter.username} />
  //     </>,
  //   ])

  return (
    <div>
      <Table title={TITLE} isLoading={isLoading} height={150} data={list} />
    </div>
  )
}

export default TreasureSale
